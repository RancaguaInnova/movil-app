import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

export default class Subscriptions extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <SectionDivider title='Suscripciones' />
        <Text>hola hola </Text>
      </View>
    )
  }
}
