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
import { graphql, compose } from 'react-apollo'
import includes from 'lodash/includes'

class ServicesScreen extends React.Component {
  static navigationOptions = {
    title: 'Servicios',
  }

  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
      applications: PropTypes.object,
    }),
  }

  async openApp(app) {
    try {
      const applicationURL = app.applicationURL
      if (applicationURL && applicationURL.trim() !== '' && this.props.data.me) {
        let finalUrl
        if (includes(applicationURL, 'libretaeducativa')) {
          // Check that the user has an account on Libreta Educativa
          console.log('this.props.data.me:', this.props.data.me)
          const authResponse = fetch('https://www.libretaeducativa.com/api/rcga/magic_link', {
            method: 'POST',
            headers: {
              Authorization: 'Basic <app-token-here>',
            },
            body: JSON.stringify({
              email: this.props.data.me.email
            })
          })
          const jsonResponse = authResponse.json()
          finalUrl = jsonResponse.attributes.magicLink
        } else {
          finalUrl = `${applicationURL}?token=${this.props.data.me.userToken}`
        }
        let result = await WebBrowser.openBrowserAsync(finalUrl)
        this.setState({ result })
      } else if (!this.props.data.me) {
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
)(ServicesScreen)
