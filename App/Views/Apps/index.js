import React from 'react'
import styles from './styles.js'
import textStyles from '/App/styles/texts'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import { WebBrowser } from 'expo'
import SubHeader from '/App/components/SubHeader'
import { client } from 'App/Root/client'
import autobind from 'autobind-decorator'
import Loading from '/App/Root/Loading'
@withGraphQL(
  gql`
    query getMe {
      me {
        _id
        profile {
          identifier
        }
        email
      }
    }
  `
)
@withGraphQL(gql`
  {
    applications(page: 1, limit: 10) {
      items {
        _id
        name
        description
        departmentId
        approved
        applicationURL
      }
    }
  }
`)
export default class Apps extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    applications: PropTypes.object,
  }

  openApp = async app => {
    try {
      if (app.externalUrl && app.externalUrl.trim() !== '' && this.props.getMe) {
        const finalUrl = `${app.applicationURL}?token=${this.props.getMe.me.profile.identifier}`
        console.log('finalUrl', finalUrl)
        let result = await WebBrowser.openBrowserAsync(finalUrl)
        this.setState({ result })
      } else if (!this.props.getMe) {
        alert('Debes iniciar sesión para continuar')
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
    const {
      applications: { items },
    } = this.props
    return (
      <View styleName='content'>
        <SubHeader view='apps' title='Seleccione el servicio' />
        <Divider styleName='line' />
        {items.map(app => this.renderRow(app))}
      </View>
    )
  }
}
