import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import LightButton from '../LightButton'

export default class TableButton extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <LightButton height={24} fontSize={18} loadingColor="#111" {...this.props} />
      </View>
    )
  }
}
