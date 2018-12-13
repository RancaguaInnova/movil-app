import React from 'react'
import { View, Text } from '@shoutem/ui'
import { Field } from 'simple-react-form'
import TextInput from 'App/components/fields/TextInput'
import PropTypes from 'prop-types'
import styles from './styles'

export default class ContactInformation extends React.Component {
  static propTypes = {
    active: PropTypes.bool
  }

  render () {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Field
            fieldName='profile.address.streetName'
            type={TextInput}
            label='Nombre de calle o avenida:'
          />
          <Field
            fieldName='profile.address.streetNumber'
            type={TextInput}
            label='Número de calle:'
          />
          <Field
            fieldName='profile.address.departmentNumber'
            type={TextInput}
            label='Número de casa o departamento:'
          />
          <Field
            fieldName='profile.phone.mobilePhone'
            type={TextInput}
            label='Celular:'
          />
        </View>
      )
    }
    return null
  }
}
