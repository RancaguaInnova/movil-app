import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
    }),
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hola login</Text>
      </View>
    )
  }
}
