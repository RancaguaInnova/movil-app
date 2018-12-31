import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from '../../helpers/date/moment'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hola hola</Text>
      </View>
    )
  }
}
