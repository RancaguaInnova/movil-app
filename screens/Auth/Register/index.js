import React from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { Form, Field } from 'simple-react-form'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import store from 'providers/StateProvider'
import { TextInput } from 'components/fields'
import { Button } from 'react-native-elements'

import LightButton from 'components/LightButton'

import { register } from 'providers/StateProvider/Auth/actions'
import { closeModal } from 'providers/StateProvider/Modal/actions'
import { pageHit, event } from '/helpers/analytics'
import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

import {
  validateIdentifier,
  validateEmail,
  validateMinLength,
  validatePresenceOfFields,
  validateCoincidence,
  combineValidators,
} from 'helpers/validators'

const pageName = 'auth/register'
class Register extends React.Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    loading: PropTypes.bool,
    session: PropTypes.object,
    error: PropTypes.object,
    navigation: PropTypes.object,
  }

  state = {
    profile: {
      subscriptions: {
        absence: false,
      },
    },
  }

  componentDidUpdate() {
    if (this.props.session && this.props.session.userId) {
      const { email } = this.props.session.user
      Alert.alert(
        'Registro exitoso',
        `Hemos enviado un email a ${email}, siga las instrucciones que ahí se indican para completar su registro`,
        [{ text: 'Aceptar', onPress: () => this.props.closeModal() }]
      )
      event('registry_success', email)
    }
  }

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
        { name: 'password', label: 'Contraseña' },
        { name: 'confirm', label: 'Confirmar Contraseña' }
      ),
      validatePresenceOfFields([
        { name: 'profile.identifier', label: 'RUT' },
        { name: 'email', label: 'Email' },
        { name: 'password', label: 'Contraseña' },
        { name: 'confirm', label: 'Confirmar Contraseña' },
      ])
    )
    return validateForm(this.state)
  }

  @autobind
  async submit() {
    if (this.props.loading) {
      this.setState({ loading: true, errorMessage: null })
    }
    try {
      const { email, password, confirm, profile } = this.state
      const form = this.state
      const errorMessage = this.validate()
      if (errorMessage) {
        throw new Error(errorMessage)
      }
      const cleanEmail = email.trim().toLowerCase()
      const newUserData = {
        email: cleanEmail,
        password,
        profile,
      }

      await this.props.register(newUserData)
    } catch (error) {
      const errorMsj = this.onError(error)
      this.setState({ errorMessage: errorMsj })
      this.setState({ loading: false })
    }
  }

  @autobind
  onError(error) {
    let errorMessage = ''
    const graphQLErrors = error.graphQLErrors || []
    if (graphQLErrors && graphQLErrors.length > 0) {
      const arrErrors = []
      graphQLErrors.forEach(err => {
        const errorKey = err.error
        if (err.validationErrors) {
          for (let field in err.validationErrors) {
            switch (err.validationErrors[field]) {
              case 'emailExists':
                arrErrors.push('El email ingresado ya se encuentra registrado')
                break
              case 'notUnique':
                arrErrors.push('El RUT ingresado ya se encuentra registrado')
                break
              default:
                arrErrors.push(`[error]:${err.validationErrors[field]}`)
            }
          }
        } else {
          arrErrors.push(`[error]:${errorKey}`)
        }
      })
      errorMessage = arrErrors.join(', ')
    } else {
      errorMessage = error.message.replace('GraphQL error: ', '')
    }

    return errorMessage
  }

  @autobind
  renderErrorMessage() {
    let errorMessage = this.state.errorMessage
    if (this.props.error) {
      errorMessage = this.onError(this.props.error)
    }
    if (!errorMessage) return
    return <Text style={styles.errorMessage}>{errorMessage}</Text>
  }

  /* @autobind
  checkSession() {
    if (this.props.session && this.props.session.user) {
      const {
        user: { email },
      } = this.props.session
      Alert.alert(
        'Registro exitoso',
        `Hemos enviado un email a ${email}, siga las instrucciones para completar su registro`,
        [{ text: 'Aceptar', onPress: () => this.props.closeModal() }]
      )
      event('registry_success', email)
    }
  } */

  render() {
    pageHit(pageName)
    //this.checkSession()
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Form state={this.state} onChange={changes => this.setState(changes)} style={{ flex: 1 }}>
            <View style={styles.fieldsContainer}>
              <Field
                enablesReturnKeyAutomatically
                returnKeyType='next'
                fieldName='profile.identifier'
                label='Rut'
                onSubmitEditing={this.focusEmail}
                type={TextInput}
                rut
              />
              <Field
                enablesReturnKeyAutomatically
                ref='email'
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
                returnKeyType='next'
                onSubmitEditing={this.focusConfirm}
                type={TextInput}
              />
              <Field
                enablesReturnKeyAutomatically
                ref='confirm'
                secureTextEntry
                fieldName='confirm'
                label='Confirmar contraseña'
                returnKeyType='done'
                onSubmitEditing={this.submit}
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
              title='Registrarse'
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
    register: (email, password, profile) => {
      dispatch(register(email, password, profile))
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
)(Register)
