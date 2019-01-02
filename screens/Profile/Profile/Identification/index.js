import React from 'react'
import { View, Text } from '@shoutem/ui'
import { Field } from 'simple-react-form'
import { TextInput, Select } from 'components/fields'
import PropTypes from 'prop-types'
import styles from './styles'

export default class IdentificationInformation extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
  }

  render() {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Field
            fieldName='profile.firstName'
            type={TextInput}
            label='Nombre:'
            placeHolder='Ingrese su nombre'
          />
          <Field fieldName='profile.lastName' type={TextInput} label='Apellido:' />
          <Field fieldName='profile.identifier' type={TextInput} label='Rut:' rut />
          <Field
            fieldName='profile.educationalLevel'
            type={Select}
            label='Nivel Educacional:'
            placeHolder='Seleccione una opción'
            options={[
              { label: 'Básica', value: 'basica' },
              { label: 'Media', value: 'media' },
              { label: 'Superior', value: 'superior' },
              { label: 'Postgrado', value: 'postgrado' },
            ]}
          />
        </View>
      )
    }
    return null
  }
}
