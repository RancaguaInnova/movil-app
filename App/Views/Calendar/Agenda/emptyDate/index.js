import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Title, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
export default class EmptyDate extends React.Component {
  static propTypes = {
    day: PropTypes.object,
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', alignItems: 'center', top: 40, padding: 10 }}
      >
        <Title style={{ textAlign: 'center' }}>No hay eventos programados para este día.</Title>
      </View>
    )
  }
}
