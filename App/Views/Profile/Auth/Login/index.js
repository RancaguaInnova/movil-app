import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles.js'
import { Form, Field } from 'simple-react-form'
import TextInput from 'App/components/fields/TextInput'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'
import Logo from 'App/components/Logo'
import LightButton from 'App/components/LightButton'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import saveSession from 'App/helpers/auth/saveSession'
import gql from 'graphql-tag'

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
    }
  }
`)
export default class Login extends React.Component {
  static propTypes = {
    open: PropTypes.func,
    loginWithPassword: PropTypes.func
  }

  state = {}

  @autobind
  focusPassword() {
    this.refs.password.focus()
  }

  isFormReady() {
    return this.state.email && this.state.password
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
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({ errorMessage })
      console.log('Error:', error)
      this.setState({ loading: false })
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Logo />
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
          onPress={() => this.props.open(0)}
          title="Olvidé mi contraseña"
        />
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          title="Entrar"
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          onPress={() => this.props.open(2)}
          title="Registrarme"
        />
      </View>
    )
  }
}
