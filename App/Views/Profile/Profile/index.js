import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Title,
  Subtitle,
  Row,
  Divider,
  TouchableOpacity
} from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import textStyles from '/App/styles/texts'
import Identification from './Identification'
import Contact from './Contact'
import { Form } from 'simple-react-form'
import Button from 'App/components/ShoutemButton'
import LightButton from 'App/components/LightButton'
import autobind from 'autobind-decorator'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import UserFragments from 'App/fragments/User'
import forceLogin from 'App/helpers/auth/forceLogin'

@forceLogin
@withGraphQL(gql`
  query getMe {
    me {
      emails {
        address
        verified
      }
      ...Profile
    }
  }
  ${UserFragments.Profile}
`)
@withMutation(gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      emails {
        address
        verified
      }
      ...Profile
    }
  }
  ${UserFragments.Profile}
`)
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  state = {
    section: '',
    errorMessage: ''
  }

  sections = [
    {
      key: 'identification',
      name: 'Identificación',
      description: 'Datos de identificación',
      icon: 'ios-person',
      component: Identification
    },
    {
      key: 'contact',
      name: 'Contacto',
      description: 'Dirección y teléfono',
      icon: 'ios-contacts',
      component: Contact
    }
  ]

  componentDidMount() {
    let me = this.props.me || {}
    this.setState({ me })
  }

  @autobind
  async signOut() {
    this.setState({ loading: true })
    await logout()
    this.props.navigation.navigate('Home')
  }

  renderLogoutButton() {
    if (this.props.me) {
      return <LightButton onPress={this.signOut} title="Cerrar Sesión" />
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  @autobind
  async submit() {
    let user = Object.assign({}, this.state.me)
    this.setState({ loading: true })
    try {
      await this.props.updateUser({ user })
    } catch (error) {
      console.log('Error updating user:', error)
    }
    this.setState({ loading: false })
  }

  @autobind
  renderArrowIcon(sectionKey) {
    if (this.state.section === sectionKey) return 'ios-arrow-back'
    return 'ios-arrow-forward'
  }

  @autobind
  renderRows(section) {
    return (
      <TouchableOpacity
        key={section.name}
        onPress={() => this.setState({ section: section.key })}
      >
        <Row styleName="small">
          <Ionicons name={section.icon} size={30} style={styles.leftIcon} />
          <View styleName="vertical">
            <Subtitle style={textStyles.rowSubtitle}>{section.name}</Subtitle>
            <Text numberOfLines={2} style={textStyles.rowText}>
              {section.description}
            </Text>
          </View>
          <Ionicons
            styleName="disclosure"
            name={this.renderArrowIcon(section.key)}
            size={28}
          />
        </Row>
        <Divider styleName="line" />
        {<section.component active={this.state.section === section.key} />}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView styleNames="fill-container" style={styles.container}>
        <Form
          state={this.state.me}
          onChange={changes => this.setState(changes)}
        >
          {this.sections.map(this.renderRows)}
        </Form>
        {this.renderErrorMessage()}
        <Button
          loading={this.state.loading}
          onPress={this.submit}
          label="Guardar"
          iconName="save"
          style={{ marginTop: 40 }}
        />
        {this.renderLogoutButton()}
      </ScrollView>
    )
  }
}
