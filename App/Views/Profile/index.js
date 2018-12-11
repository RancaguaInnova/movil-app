import React from 'react'
import { View, Text } from '@shoutem/ui'
import TextInput from 'App/components/fields/TextInput'
import { Form, Field } from 'simple-react-form'
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
      ...FullUser
    }
  }
  ${UserFragments.FullUser}
`)
@withMutation(gql`
  mutation updateUser($user: User!) {
    updateUser(user: $user) {
      ...FullUser
    }
  }
  ${UserFragments.FullUser}
`)
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  state = {
    errorMessage: ''
  }

  componentDidMount() {
    let me = this.props.me || {}
    this.state = { me, errorMessage: '' }
  }

  @autobind
  async signOut() {
    this.setState({ loading: true })
    await logout()
    console.log('logged out:')
    this.props.navigation.navigate('Home')
    console.log('redirected!')
  }

  renderLogoutButton() {
    if (this.props.me) {
      return <LightButton onPress={this.signOut} title="Logout" />
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <View styleNames="fill-container" style={styles.container}>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field
            fieldName="profile.firstname"
            type={TextInput}
            label="Nombre:"
            placeHolder="Ingrese su nombre"
          />
          <Field
            fieldName="profile.lastName"
            type={TextInput}
            label="Apellido:"
          />
        </Form>
        {this.renderErrorMessage()}
        <Button
          loading={this.state.loading}
          onPress={this.submit}
          label="Guardar"
          iconName="save"
        />
        {this.renderLogoutButton()}
      </View>
    )
  }
}
