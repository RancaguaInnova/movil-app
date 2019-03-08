import React from 'react'
import { View, ScrollView } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

export default class Subscriptions extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <SectionDivider title='Suscripciones' />
        <Text style={{ padding: 15 }}>Marque los departamentos de su interés</Text>
        <ScrollView style={{ paddingTop: 5 }}>
          <CheckBox
            title='Deporte'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />
          <CheckBox
            title='Cultura'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />
          <CheckBox
            title='Desarrollo'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />
          <CheckBox
            title='Innovación'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />
          <CheckBox
            title='Salud'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />

          <CheckBox
            title='Educación'
            checked={true}
            checkedColor='#ff1248'
            containerStyle={{
              margin: 7,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#ebebeb',
            }}
          />
        </ScrollView>
      </View>
    )
  }
}
