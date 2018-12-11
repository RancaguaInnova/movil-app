import React from 'react'
import { View, Title, Subtitle, Text, Caption } from '@shoutem/ui'
import styles from './styles.js'
import { Form, Field } from 'simple-react-form'
import TextInput from 'App/components/fields/TextInput'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Button from 'App/components/ShoutemButton'
import LightButton from 'App/components/LightButton'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import { withNavigation, NavigationActions } from 'react-navigation'
import saveSession from 'App/helpers/auth/saveSession'
import gql from 'graphql-tag'

@withNavigation
@withMutation(gql`
  mutation loginWithPassword($email: String, $password: String) {
    session: loginWithPassword(email: $email, password: $password) {
      _id
      publicKey
      secretKey
      userId
      locale
      roles
      emailVerified
      user {
        _id
      }
    }
  }
`)
export default class Login extends React.Component {
  static propTypes = {
    open: PropTypes.func,
    loginWithPassword: PropTypes.func
  }

  state = { email: '', password: '' }

  @autobind
  focusPassword() {
    this.refs.password.focus()
  }

  isFormReady() {
    if (this.state.email && this.state.password) return true
    return false
  }

  @autobind
  async submit() {
    this.setState({ loading: true, errorMessage: null })
    try {
      const { email, password } = this.state
      const { session } = await this.props.loginWithPassword({
        email,
        password
      })
      await saveSession(session)
      this.props.navigation.navigate(
        'Profile',
        {},
        NavigationActions.navigate({ routeName: 'Profile' })
      )
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({ errorMessage: 'Email o contraseña incorrecta' })
      console.log('Error:', error)
      this.setState({ loading: false })
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return null
    return (
      <Caption style={styles.errorMessage}>{this.state.errorMessage}</Caption>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Inicia sesión en tu cuenta:</Title>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              enablesReturnKeyAutomatically
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
              returnKeyType={this.state.hasTwoFactor ? 'next' : 'done'}
              onSubmitEditing={this.state.hasTwoFactor ? null : this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        <LightButton
          onPress={() => this.props.navigation.navigate('Forgot')}
          title="Olvidé mi contraseña"
        />
        <View>
          <Button
            disabled={!this.isFormReady()}
            loading={this.state.loading}
            onPress={this.submit}
            label="Entrar"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            label="Registrarme"
          />
        </View>
      </View>
    )
  }
}
