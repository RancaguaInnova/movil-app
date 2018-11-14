import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'

export default class ApolloError extends React.Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    )
  }
}
