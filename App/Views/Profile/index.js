import React from 'react'
import { ScrollView, View, Text, Title } from '@shoutem/ui'
import TextInput from 'App/components/fields/TextInput'
import SelectInput from 'App/components/fields/TableSelect'
import { Form, Field } from 'simple-react-form'
import Button from 'App/components/ShoutemButton'
import LightButton from 'App/components/LightButton'
import autobind from 'autobind-decorator'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import UserFragments from 'App/fragments/User'
import forceLogin from 'App/helpers/auth/forceLogin'

@forceLogin
@withGraphQL(gql`
  query getMe {
    me {
      emails {
        address
        verified
      }
      ...Profile
    }
  }
  ${UserFragments.Profile}
`)
@withMutation(gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      emails {
        address
        verified
      }
      ...Profile
    }
  }
  ${UserFragments.Profile}
`)
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  state = {
    errorMessage: ''
  }

  componentDidMount() {
    let me = this.props.me || {}
    this.setState({ me })
  }

  @autobind
  async signOut() {
    this.setState({ loading: true })
    await logout()
    this.props.navigation.navigate('Home')
  }

  renderLogoutButton() {
    if (this.props.me) {
      return <LightButton onPress={this.signOut} title="Logout" />
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  @autobind
  async submit() {
    let user = Object.assign({}, this.state.me)
    this.setState({ loading: true })
    try {
      await this.props.updateUser({ user })
    } catch (error) {
      console.log('Error updating user:', error)
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <ScrollView styleNames="fill-container" style={styles.container}>
        <Form
          state={this.state.me}
          onChange={changes => this.setState(changes)}
        >
          <Title style={styles.title}>Indentificación:</Title>
          <Field
            fieldName="profile.firstName"
            type={TextInput}
            label="Nombre:"
            placeHolder="Ingrese su nombre"
          />
          <Field
            fieldName="profile.lastName"
            type={TextInput}
            label="Apellido:"
          />
          <Field fieldName="profile.identifier" type={TextInput} label="Rut:" />
          <Field
            fieldName="profile.educationalLevel"
            type={SelectInput}
            label="Nivel Educacional:"
            placeHolder="Seleccione una opción"
            options={[
              { label: 'Básica', value: 'basica' },
              { label: 'Media', value: 'media' },
              { label: 'Superior', value: 'superior' },
              { label: 'Postgrado', value: 'postgrado' }
            ]}
          />
          <Title style={styles.title}>Contacto:</Title>
          <Field
            fieldName="profile.address.streetName"
            type={TextInput}
            label="Nombre de calle o avenida:"
          />
          <Field
            fieldName="profile.address.streetNumber"
            type={TextInput}
            label="Número de calle:"
          />
          <Field
            fieldName="profile.address.departmentNumber"
            type={TextInput}
            label="Número de casa o departamento:"
          />
          <Field
            fieldName="profile.phone.mobilePhone"
            type={TextInput}
            label="Celular:"
          />
        </Form>
        {this.renderErrorMessage()}
        <Button
          loading={this.state.loading}
          onPress={this.submit}
          label="Guardar"
          iconName="save"
        />
        {this.renderLogoutButton()}
      </ScrollView>
    )
  }
}
