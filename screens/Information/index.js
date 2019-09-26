import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'
import CustomHeader from 'components/CustomHeader'
import { WebView } from 'react-native'

export default class Information extends React.Component {
  static propTypes = {}
  static navigationOptions = {
    header: <CustomHeader type='main' />,
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionDivider title='Informaciones' />
        <Text>hola hola </Text>
      </View>
    )
  }
}
