import React from 'react'
import { View, Text } from '@shoutem/ui'
import TableTextInput from 'App/components/fields/TableTextInput'
import { Form, Field } from 'simple-react-form'
import Button from 'App/components/Button'
import LightButton from 'App/components/LightButton'
import autobind from 'autobind-decorator'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      email
      profile {
        firstName
        lastName
        identifier
        address {
          streetName
          streetNumber
          departmentNumber
          postalCode
          city
        }
        phone {
          areaCode
          number
          mobilePhone
        }
        educationalLevel
      }
      active
    }
  }
`)
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  state = { ...(this.props.me || { profile: {} }) }

  renderLogoutButton() {
    if (this.props.me) {
      return <LightButton onPress={() => logout()} title="Logout" />
    }
    return null
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <TableTextInput
          value={this.state.profile.firstName || 'Ingresa tu nombre'}
          onChangeText={change => this.setState}
          label="Nombre:"
        />
        {this.renderErrorMessage()}
        <Button
          loading={this.state.loading}
          onPress={this.submit}
          height={30}
          textStyle={{ fontSize: 15 }}
          title="Guardar"
        />
      </View>
    )
  }
}
