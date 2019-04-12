import React from 'react'
import { View, Text, Divider, Caption, Subtitle, TouchableOpacity, Row } from '@shoutem/ui'
import { Alert, ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { WebBrowser } from 'expo'
import PropTypes from 'prop-types'
import Auth from 'screens/Auth'
import textStyles from 'styles/texts'
import styles from './styles'

import { pageHit, event } from '/helpers/analytics'
import { parseUrl } from '/helpers/url'

import SubHeader from 'components/SubHeader'
import SectionDivider from 'components/SectionDivider'
import Loading from 'components/Loading'
import CustomHeader from 'components/CustomHeader'

const pageName = 'services'

export default class Services extends React.Component {
  static propTypes = {
    session: PropTypes.object,
    getServices: PropTypes.func.isRequired,
    openWebView: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    services: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }

  static navigationOptions = {
    header: <CustomHeader type='main' />,
  }

  async componentDidMount() {
    try {
      await this.props.getServices()
    } catch (error) {
      console.log('Error getting services:', error)
    }
  }

  // TODO: move this to a Redux action?
  async getMagicLink(app) {
    const userEmail = this.props.session.user.email
    try {
      const response = await fetch(app.applicationURL, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${app.appToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_session: {
            email: `${userEmail}`,
          },
        }),
      })
      const {
        data: {
          attributes: { url },
        },
      } = await response.json()
      console.log('url:', url)
      return url
    } catch (error) {
      console.log('Error getting magic link:', error)
    }
  }

  async openApp(app) {
    const { session } = this.props
    try {
      if (
        app.applicationURL &&
        app.applicationURL.trim() !== '' &&
        session &&
        session.user &&
        session.user.userToken
      ) {
        let finalUrl
        // TODO: Change this condition to check a more general flag
        if (app.name === 'Libreta Educativa') {
          const userUrl = await this.getMagicLink(app)
          finalUrl = parseUrl(userUrl)
        } else {
          finalUrl = parseUrl(app.applicationURL, { token: session.user.userToken })
        }
        console.log('finalUrl', finalUrl)
        this.props.openWebView(finalUrl, false)
        //let result = await WebBrowser.openBrowserAsync(finalUrl)
        //this.setState({ result })
        event('click_service_online', app.applicationURL)
      } else if (!session || !session.user || !seshágalesion.user.userToken) {
        Alert.alert('Debe iniciar sesión para acceder al servicio', null, [
          {
            text: 'Cancelar',
            onPress: () => {
              event('click_service_login', 'cancel')
            },
            style: 'cancel',
          },
          {
            text: 'Iniciar',
            onPress: () => {
              this.props.openModal(<Auth show='login' />)
              //this.props.navigation.navigate('Profile')
              event('click_service_login', 'login')
            },
          },
        ])
        event('click_service_offline', app.applicationURL)
      }
    } catch (error) {
      //this.setState({ result: null })
    }
  }

  renderRow(app) {
    return (
      <TouchableOpacity key={app.name} onPress={() => this.openApp(app)}>
        <Row style={{ marginBottom: 5 }}>
          <Ionicons name={app.icon || 'ios-apps'} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle style={{ ...textStyles.rowSubtitle, marginTop: 5 }}>{app.name}</Subtitle>
            <Text
              numberOfLines={3}
              style={{ ...textStyles.rowText, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}
            >
              {app.description}
            </Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    pageHit(pageName)
    const { services, loading, error } = this.props
    const items = services && services.items ? services.items : []
    if (loading) {
      return <Loading />
    } else if (error) {
      return <Text>Ups! Ocurrió un error!</Text>
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
          <SectionDivider title='Servicios disponibles' />
          <SubHeader
            view='apps'
            title='Seleccione el servicio'
            navigation={this.props.navigation}
            me={this.props.session}
          />
          <ScrollView>{items.map(app => this.renderRow(app))}</ScrollView>
        </View>
      )
    }
  }
}
