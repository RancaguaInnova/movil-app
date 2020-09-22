import React from 'react'
import './styles.js'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';

import {  Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});
export default class EmptyDate extends React.Component {
  static propTypes = {
    day: PropTypes.object,
  }
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', alignItems: 'center', top: 40, padding: 10 }}
      >
        <Text style={styles.text} category='s1'>
          No hay eventos programados para este día.
        </Text>
      </View>
    )
  }
}
