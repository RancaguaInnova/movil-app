import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { Form, Field } from 'simple-react-form'
import autobind from 'autobind-decorator'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

import { TextInput } from 'components/fields'
import LightButton from 'components/LightButton'
import SectionDivider from 'components/SectionDivider'
import TimerMixin from 'react-timer-mixin'
import { login } from 'providers/StateProvider/Auth/actions'
import { closeModal } from 'providers/StateProvider/Modal/actions'
import store from 'providers/StateProvider'
import { pageHit, event } from '/helpers/analytics'
import styles from './styles.js'

const pageName = 'auth/login'
class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
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
      console.log('login_error:', error)
    }
  }

  componentDidUpdate() {
    if (this.props.session && this.props.session.userId) {
      this.props.closeModal()
    }
  }

  renderErrorMessage() {
    const { error } = this.props || null
    if (!error) return null
    return <Text style={styles.errorMessage}>Email o contraseña incorrecta</Text>
  }

  render() {
    pageHit(pageName)
    return (
      <View style={styles.container}>
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

              {this.renderErrorMessage()}
            </View>
          </Form>

          <View style={styles.fieldsContainer}>
            <Button
              disabled={!this.isFormReady()}
              loading={this.props.loading}
              onPress={this.submit}
              titleStyle={styles.submitTitle}
              buttonStyle={styles.submitButton}
              title='Iniciar'
            />
          </View>
        </View>
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
    closeModal: () => {
      dispatch(closeModal())
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
