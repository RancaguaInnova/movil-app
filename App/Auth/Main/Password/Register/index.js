import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'
import Logo from 'App/components/Logo'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import saveSession from 'App/helpers/auth/saveSession'
import gql from 'graphql-tag'
import {
  validateEmail,
  validateIdentifier,
  validateMinLength,
  validatePresenceOfFields,
  validateCoincidence,
  combineValidators
} from 'App/helpers/validators'

@withMutation(gql`
  mutation createUser($email: String, $password: String, $profile: UserProfileInput) {
    session: createUser(email: $email, password: $password, profile: $profile) {
      _id
      publicKey
      secretKey
      userId
      locale
      roles
      emailVerified
    }
  }
`)
export default class Register extends React.Component {
  static propTypes = {
    createUser: PropTypes.func,
    open: PropTypes.func
  }

  state = {}

  @autobind
  focusEmail() {
    this.refs.email.refs.input.focus()
  }

  @autobind
  focusPassword() {
    this.refs.password.refs.input.focus()
  }

  @autobind
  focusConfirm() {
    this.refs.confirm.refs.input.focus()
  }

  isFormReady() {
    return this.state.email && this.state.password && this.state.confirm
  }

  validate() {
    const validateForm = combineValidators(
      validateIdentifier('profile.identifier'),
      validateEmail('email'),
      validateMinLength('password', 8),
      validateCoincidence(
        {name: 'password', label: 'Contraseña'},
        {name: 'confirm', label: 'Confirmar Contraseña'}
      ),
      validatePresenceOfFields([
        {name: 'profile.identifier', label: 'RUT'},
        {name: 'email', label: 'Email'},
        {name: 'password', label: 'Contraseña'},
        {name: 'confirm', label: 'Confirmar Contraseña'}
      ])
    )
    return validateForm(this.state)
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email, password, confirm, profile} = this.state
      const form = this.state
      const errorMessage = this.validate()
      if (errorMessage) {
         throw new Error(errorMessage)
      }
      const {session} = await this.props.createUser({email, password, profile})
      await saveSession(session)
    } catch (error) {
      console.log(error)
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({errorMessage})
      console.log('Error:', error)
      this.setState({loading: false})
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate!</Text>
        <Form
          state={this.state}
          onChange={changes => this.setState(changes)}
        >
          <View>
            <Logo />
            <Field
              enablesReturnKeyAutomatically
              returnKeyType="next"
              fieldName="profile.identifier"
              label="RUT: 11.222.333-k"
              onSubmitEditing={this.focusEmail}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="email"
              returnKeyType="next"
              keyboardType="email-address"
              fieldName="email"
              label="Email"
              onSubmitEditing={this.focusPassword}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="password"
              secureTextEntry
              fieldName="password"
              label="Contraseña"
              returnKeyType="next"
              onSubmitEditing={this.focusConfirm}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="confirm"
              secureTextEntry
              fieldName="confirm"
              label="Confirmar contraseña"
              returnKeyType="done"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          title="Crear cuenta"
        />
      </View>
    )
  }
}
