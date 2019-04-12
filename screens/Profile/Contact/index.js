import React from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { Field } from 'simple-react-form'
import { TextInput } from 'components/fields'
import PropTypes from 'prop-types'
import styles from './styles'

export default class ContactInformation extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
  }

  render() {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Información de Contacto</Text>
          <Divider style={styles.divider} />
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
          <Field fieldName='profile.phone.mobilePhone' type={TextInput} label='Celular:' />
        </View>
      )
    }
    return null
  }
}
