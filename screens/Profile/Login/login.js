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
import Error from 'providers/ApolloProvider/ApolloError'
const pageName = 'profile/login'

@withNavigation
export default class Login extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired
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
      await this.props.onLogin(email, password)

    } catch (error) {
      console.log('Error at onLogin redux:', error)
    //   const errorMessage = error.message.replace('GraphQL error: ', '')
    //   this.setState({ errorMessage: 'Email o contraseña incorrecta' })
    //   event('login_error', error)
    //   this.setState({ loading: false })
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return null
    return <Caption style={styles.errorMessage}>{this.state.errorMessage}</Caption>
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
            loading={this.state.loading}
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
