import React from 'react'
import { View } from 'react-native'
import styles from './styles.js'
import { Image } from 'react-native'
import { Circle } from 'react-native-progress'

export default class Loading extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        {/* <Circle size={40} indeterminate color='#0069ff' /> */}
        <Image source={require('./../../../assets/images/loading.gif')} />
      </View>
    )
  }
}
