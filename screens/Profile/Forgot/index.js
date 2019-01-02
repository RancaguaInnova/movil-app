import React from 'react'
import { View, Title, Text } from '@shoutem/ui'
import styles from './styles.js'
import { Form, Field } from 'simple-react-form'
import TextInput from 'components/fields/TextInput'
import Button from 'components/ShoutemButton'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import LightButton from 'components/LightButton'

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
    this.setState({ loading: true, errorMessage: null })
    try {
      const { email } = this.state
      await this.props.forgotPassword({ email })
      this.setState({ success: true })
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({ errorMessage })
      console.log(error)
    }
    this.setState({ loading: false })
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  renderMessage() {
    if (!this.state.success) return null
    return (
      <Text style={styles.successMessage}>Revisa tu email para continuar</Text>
    )
  }

  renderButtons() {
    if (this.state.success) return null
    return (
      <View>
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          label="Cambiar contraseña"
        />
        <LightButton
          onPress={() => this.props.navigation.goBack()}
          title="Volver"
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Enviaremos instrucciones a tu correo</Title>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View style={styles.fieldsContainer}>
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
        {this.renderButtons()}
        {this.renderMessage()}
      </View>
    )
  }
}
