import React from 'react'
import { View, Text, Divider, Caption, Subtitle, TouchableOpacity, Row } from '@shoutem/ui'
import { Alert, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import textStyles from './../../styles/texts'
import styles from './styles'
import SubHeader from './../../components/SubHeader'
import SectionDivider from '../../components/SectionDivider'
import { Ionicons } from '@expo/vector-icons'
import { WebBrowser } from 'expo'
import { getMeQry, servicesListQry } from './../../queries'
import { getSession } from './../../providers/ApolloProvider'
import { graphql, compose } from 'react-apollo'

class Services extends React.Component {
  static navigationOptions = {
    title: 'Servicios',
  }

  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
      applications: PropTypes.object,
    }),
  }

  state = {
    profile: null,
  }

  componentDidMount() {
    this.setState({
      profile: getSession(),
    })
  }

  async openApp(app) {
    try {
      if (app.applicationURL && app.applicationURL.trim() !== '' && this.state.profile) {
        const finalUrl = `${app.applicationURL}?token=${this.state.profile.userToken}`
        console.log('finalUrl', finalUrl)
        let result = await WebBrowser.openBrowserAsync(finalUrl)
        this.setState({ result })
      } else if (!this.state.profile) {
        Alert.alert('Debe iniciar sesión para acceder al servicio')
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
    const items =
      this.props.data.applications && this.props.data.applications.items
        ? this.props.data.applications.items
        : []
    return (
      <View style={styles.container}>
        <SubHeader view='apps' title='Seleccione el servicio' />
        <SectionDivider title='Servicios disponibles' />
        <ScrollView>{items.map(app => this.renderRow(app))}</ScrollView>
      </View>
    )
  }
}

export default compose(
  graphql(getMeQry),
  graphql(servicesListQry)
)(Services)
