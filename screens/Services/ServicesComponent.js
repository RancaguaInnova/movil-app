import React from 'react'
import { View, Text, Divider, Caption, Subtitle, TouchableOpacity, Row } from '@shoutem/ui'
import { Alert, ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { pageHit, event } from '/helpers/analytics'
import PropTypes from 'prop-types'
import textStyles from 'styles/texts'
import styles from './styles'
import SubHeader from 'components/SubHeader'
import SectionDivider from 'components/SectionDivider'
import Loading from 'components/Loading'
import { Ionicons } from '@expo/vector-icons'
import { WebBrowser } from 'expo'
import { parseUrl } from '/helpers/url'
const pageName = 'services'

export default class Services extends React.Component {
  static propTypes = {
    session: PropTypes.object,
    getServices: PropTypes.func.isRequired,
    services: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  static navigationOptions = {
    title: 'Servicios',
  }

  async componentDidMount() {
    console.log('Running didMount')
    try {
      await this.props.getServices()
    } catch(error) {
      console.log('Error getting services:', error)
    }
  }

  async openApp(app) {
    const { session } = this.props
    try {
      if (app.applicationURL && app.applicationURL.trim() !== '' && session) {
        const finalUrl = parseUrl(app.applicationURL, { token: session.userToken })
        let result = await WebBrowser.openBrowserAsync(finalUrl)
        this.setState({ result })
        event('click_service_online', app.applicationURL)
      } else if (!session) {
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
              this.props.navigation.navigate('Profile')
              event('click_service_login', 'login')
            },
          },
        ])
        event('click_service_offline', app.applicationURL)
      }
    } catch (error) {
      this.setState({ result: null })
    }
  }

  renderRow(app) {
    return (
      <TouchableOpacity key={app.name} onPress={() => this.openApp(app)}>
        <Row styleName='small'>
          <Ionicons name={app.icon || ''} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{app.name}</Subtitle>
            <Text numberOfLines={2} style={textStyles.rowText}>
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
    }  else if (error) {
      return <Text>Ups! Ocurrió un error!</Text>
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
          <SubHeader
            view='apps'
            title='Seleccione el servicio'
            navigation={this.props.navigation}
            me={this.props.session}
          />

          <SectionDivider title='Servicios disponibles' />
          <ScrollView>{items.map(app => this.renderRow(app))}</ScrollView>
        </View>
      )
    }
  }
}
