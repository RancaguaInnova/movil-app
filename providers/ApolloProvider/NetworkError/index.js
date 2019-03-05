import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class Error extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Network Error</Text>
      </View>
    )
  }
}
