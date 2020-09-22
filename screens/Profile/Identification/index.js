import React from 'react'
import { View,StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { Text } from '@ui-kitten/components'
import { Field } from 'simple-react-form'
import { TextInput, Select, DateInput } from 'components/fields'
import PropTypes from 'prop-types'
import  './styles'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});
export default class IdentificationInformation extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
  }

  render() {
    if (this.props.active) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Información Personal</Text>
          <Divider style={styles.divider} />
          <Field fieldName='profile.identifier' type={TextInput} label='Rut:' rut />
          <Field
            fieldName='profile.firstName'
            type={TextInput}
            label='Nombre:'
            placeHolder='Ingrese su nombre'
          />
          <Field fieldName='profile.lastName' type={TextInput} label='Apellido:' />
          <Text style={styles.text} category='h3'>Fecha de nacimiento</Text>
          <Field
            fieldName='profile.birthdate'
            type={DateInput}
            placeholder='Seleccione una fecha'
          />
          <Field
            fieldName='profile.gender'
            type={Select}
            label='Género:'
            placeHolder='Seleccione una opción'
            options={[{ label: 'Mujer', value: 'mujer' }, { label: 'Hombre', value: 'hombre' }]}
          />
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
