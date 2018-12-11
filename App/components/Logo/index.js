import React from 'react'
import { View, Image } from '@shoutem/ui'
import styles from './styles.js'

export default class Logo extends React.Component {
  static propTypes = {}

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={require('App/assets/logo.png')}
        />
      </View>
    )
  }
}
