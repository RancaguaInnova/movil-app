import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TableTextInput from 'App/components/fields/TableTextInput'
import headerStyle from 'App/styles/headerStyle'
import TableButton from 'App/components/TableButton'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import getErrorMessage from 'App/helpers/errors/getErrorMessage'

@withMutation(gql`
  mutation changePassword($oldPassword: String, $newPassword: String) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`)
export default class ChangePassword extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func
  }

  static navigationOptions = {
    title: 'Cambiar contraseña',
    headerStyle
  }

  state = {}

  @autobind
  async change() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {oldPassword, newPassword, confirm} = this.state
      if (newPassword !== confirm) {
        throw new Error('Las contraseñas no coinciden')
      }
      await this.props.changePassword({oldPassword, newPassword})
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      this.setState({errorMessage})
    }
    this.setState({loading: false})
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              fieldName="oldPassword"
              label="Contraseña antigua"
              secureTextEntry
              bottom
              type={TableTextInput}
            />
            <View style={styles.separation} />
            <Field
              fieldName="newPassword"
              secureTextEntry
              label="Nueva contraseña"
              type={TableTextInput}
            />
            <Field
              fieldName="confirm"
              secureTextEntry
              label="Confirmar contraseña"
              bottom
              type={TableTextInput}
            />
            <View style={styles.separation} />
            {this.renderErrorMessage()}
            <TableButton
              loading={this.state.loading}
              onPress={this.change}
              title="Cambiar contraseña"
            />
          </View>
        </Form>
      </ScrollView>
    )
  }
}
