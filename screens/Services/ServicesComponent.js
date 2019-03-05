import React from 'react'
import { View, Text, Divider, Caption, Subtitle, TouchableOpacity, Row } from '@shoutem/ui'
import { Alert, ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { pageHit, event } from '/helpers/analytics'
import PropTypes from 'prop-types'
import textStyles from 'styles/texts'
import styles from './styles'
import SubHeader from 'components/SubHeader'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import SectionDivider from '../../components/SectionDivider'
import { Ionicons } from '@expo/vector-icons'
import { WebBrowser } from 'expo'
import { getMeQry, servicesListQry, bannerBySectionQry } from 'providers/ApolloProvider/queries'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { parseUrl } from '/helpers/url'
const pageName = 'services'

@withGraphQL(servicesListQry, { loading: <Loading />, errorComponent: <Error /> })
export default class Services extends React.Component {

  static propTypes = {
    session: PropTypes.object,
    applications: PropTypes.object,
  }

  state = {
    profile: null,
  }

  static navigationOptions = {
    title: 'Servicios',
  }

  componentDidMount() {
    this.setState({
      session: this.props.session,
    })
  }

  async openApp(app) {
    const { session } = this.props.session
    try {
      if (app.applicationURL && app.applicationURL.trim() !== '' && sesison) {
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
          <Ionicons name={app.icon} size={30} style={styles.leftIcon} />
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
    const { applications } = this.props
    pageHit(pageName)
    const items = applications && applications.items ? applications.items : []
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
