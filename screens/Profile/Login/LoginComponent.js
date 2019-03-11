import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { pageHit, event } from '/helpers/analytics'

import { View, Title, Subtitle, Text, Caption } from '@shoutem/ui'

import styles from './styles'
import { Form, Field } from 'simple-react-form'
import { TextInput } from 'components/fields'
import Button from 'components/ShoutemButton'
import LightButton from 'components/LightButton'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { withNavigation, NavigationActions } from 'react-navigation'
const pageName = 'profile/login'

@withNavigation
export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
    error: PropTypes.object,
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
    try {
      const { email, password } = this.state
      await this.props.login(email, password)
    } catch (error) {
      event('login_error', error)
    }
  }

  renderErrorMessage() {
    const { error } = this.props || null
    if (!error) return null
    return <Caption style={styles.errorMessage}>Email o contraseña incorrecta</Caption>
  }

  render() {
    pageHit(pageName)
    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        <Title style={styles.title}>Inicia sesión en tu cuenta:</Title>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View style={styles.fieldsContainer}>
            <Field
              enablesReturnKeyAutomatically
              returnKeyType='next'
              keyboardType='email-address'
              fieldName='email'
              label='Email'
              onSubmitEditing={this.focusPassword}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref='password'
              secureTextEntry
              fieldName='password'
              label='Contraseña'
              returnKeyType={this.state.hasTwoFactor ? 'next' : 'done'}
              onSubmitEditing={this.state.hasTwoFactor ? null : this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        <LightButton
          onPress={() => this.props.navigation.navigate('Forgot')}
          title='Olvidé mi contraseña'
        />
        <View>
          <Button
            disabled={!this.isFormReady()}
            loading={this.props.loading}
            onPress={this.submit}
            label='Entrar'
          />
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            label='Registrarme'
            color='#b22d48'
          />
        </View>
      </ScrollView>
    )
  }
}
