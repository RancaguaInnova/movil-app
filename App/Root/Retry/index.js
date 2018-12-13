import React from 'react'
import { View } from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

export default class Retry extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: 'white',
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name='ios-refresh-circle'
          size={40}
          color={this.props.color}
          onPress={this.props.callback}
        />
      </View>
    )
  }
}
