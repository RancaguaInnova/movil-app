import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.object,
  }
  render() {
    return <View style={{ borderWidth: 1, borderColor: 'yellow' }} />
  }
}
