import React from 'react'
import {View, Image} from 'react-native'
import styles from './styles.js'

export default class Logo extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.image} source={require('App/assets/logo.png')} />
      </View>
    )
  }
}
