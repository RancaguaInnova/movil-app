import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import {Circle} from 'react-native-progress'

export default class Loading extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Circle size={40} indeterminate color="#0069ff" />
      </View>
    )
  }
}
