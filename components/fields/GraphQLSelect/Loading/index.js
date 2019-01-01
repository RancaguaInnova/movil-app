import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'

export default class Loading extends React.Component {
  static propTypes = {}

  render() {
    return <View style={styles.container} />
  }
}
