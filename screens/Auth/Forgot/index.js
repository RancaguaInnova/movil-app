import React from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { Form, Field } from 'simple-react-form'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import { Button } from 'react-native-elements'

import { TextInput } from 'components/fields'
import LightButton from 'components/LightButton'
import SectionDivider from 'components/SectionDivider'

import { login } from 'providers/StateProvider/Auth/actions'
import { closeModal } from 'providers/StateProvider/Modal/actions'
import { pageHit, event } from '/helpers/analytics'
import styles from './styles.js'

const pageName = 'auth/forgot'

@withMutation(gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email)
  }
`)
class Forgot extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
    error: PropTypes.object,
    closeModal: PropTypes.func,
    forgotPassword: PropTypes.func,
  }

  static propTypes = {
    forgotPassword: PropTypes.func,
  }

  state = {}

  isFormReady() {
    return !!this.state.email
  }

  @autobind
  async submit() {
    this.setState({ loading: true, errorMessage: null })
    try {
      const { email } = this.state
      await this.props.forgotPassword({ email })
      this.setState({ success: true, loading: false })

      event('recover_password_success', email)
      Alert.alert(
        'Recuperar contraseña',
        `Hemos enviado un email a ${email}, siga las instrucciones para recuperar su contraseña`,
        [{ text: 'Aceptar', onPress: () => this.props.closeModal() }]
      )
    } catch ({ response, operation, graphQLErrors, networkError }) {
      const arrError = graphQLErrors || []
      const arrMsj = []
      arrError.forEach(err => {
        let txt = 'Ups, ocurrió un problema intente nuevamente'
        if (err.validationErrors) {
          for (let k in err.validationErrors) {
            switch (err.validationErrors[k]) {
              case 'notAnEmail':
                txt = 'El email ingresado no es válido'
                break
              case 'userNotFound':
                txt = 'El email ingresado no se encuentra registrado'
                break
            }
          }
        } else {
          txt = err.message
        }
        arrMsj.push(txt)
      })
      const errorMessage =
        arrMsj.length > 0 ? arrMsj.join(', ') : 'Ups, ocurrió un problema intente nuevamente' //response.message.replace('GraphQL error: ', '')
      this.setState({ errorMessage, loading: false })
      event('recover_password_error', JSON.stringify(arrMsj))
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  renderButtons() {
    if (this.state.success) return null
    return (
      <View>
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          label='Cambiar contraseña'
        />
        <LightButton onPress={() => this.props.navigation.goBack()} title='Volver' />
      </View>
    )
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
                onSubmitEditing={this.submit}
                type={TextInput}
              />

              {this.renderErrorMessage()}
            </View>
          </Form>

          <View style={styles.fieldsContainer}>
            <Button
              disabled={!this.isFormReady()}
              loading={this.state.loading}
              onPress={this.submit}
              titleStyle={styles.submitTitle}
              buttonStyle={styles.submitButton}
              title='Recuperar'
            />
          </View>
          {/* <View style={styles.fieldsContainer}>
            <Button
              disabled={!this.isFormReady()}
              loading={this.props.loading}
              onPress={this.submit}
              titleStyle={styles.submitTitle}
              buttonStyle={styles.submitButton}
              title='Entrar'
            />
          </View> */}
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
)(Forgot)
