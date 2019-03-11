import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { Form, Field } from 'simple-react-form'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

import { TextInput } from 'components/fields'
import Button from 'components/ShoutemButton'
import LightButton from 'components/LightButton'

import { login } from 'providers/StateProvider/Auth/actions'
import { pageHit, event } from '/helpers/analytics'
import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

const pageName = 'profile/login'
class Login extends React.Component {
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
      <View style={styles.container}>
        <SectionDivider title='Iniciar Sesión' />
        <ScrollView>
          <View style={styles.content}>
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

            <Button
              disabled={!this.isFormReady()}
              loading={this.props.loading}
              onPress={this.submit}
              label='Entrar'
            />
          </View>
          <View style={styles.content}>
            <LightButton
              onPress={() => this.props.navigation.navigate('Forgot')}
              title='Olvidé mi contraseña'
            />
            <Button
              onPress={() => this.props.navigation.navigate('Register')}
              label='Registrarme'
              color='#b22d48'
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

// Redux

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
  }
}

const mapStateToProps = state => {
  const {
    auth: { session, loading, error },
  } = state
  return {
    session,
    loading,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
