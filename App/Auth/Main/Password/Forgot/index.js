import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import Button from 'App/components/Button'
import Logo from 'App/components/Logo'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'

@withMutation(gql`
  mutation forgotPassword($email: String) {
    forgotPassword(email: $email)
  }
`)
export default class Forgot extends React.Component {
  static propTypes = {
    forgotPassword: PropTypes.func
  }

  state = {}

  isFormReady() {
    return !!this.state.email
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email} = this.state
      await this.props.forgotPassword({email})
      this.setState({success: true})
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({errorMessage})
      console.log(error)
    }
    this.setState({loading: false})
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  renderMessage() {
    if (!this.state.success) return
    return <Text style={styles.successMessage}>Revisa tu email para continuar</Text>
  }

  renderButton() {
    if (this.state.success) return
    return (
      <Button
        disabled={!this.isFormReady()}
        loading={this.state.loading}
        onPress={this.submit}
        title="Cambiar contraseña"
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar cuenta</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Logo />
            <Field
              enablesReturnKeyAutomatically
              returnKeyType="next"
              keyboardType="email-address"
              fieldName="email"
              label="Email"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        {this.renderButton()}
        {this.renderMessage()}
      </View>
    )
  }
}
