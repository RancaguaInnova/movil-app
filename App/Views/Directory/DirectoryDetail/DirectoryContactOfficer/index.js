import React from 'react'
import styles from './styles.js'
import { View, Text, TouchableOpacity, Row, Subtitle, Divider } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
export default class DirectoryDetailOfficer extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Row styleName='small'>
          <Ionicons name='logo-android' size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle>CARGO 1</Subtitle>
            <Text numberOfLines={2}>Nombre de la persona</Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-mail' size={28} style={{ paddingRight: 25 }} />
          <Ionicons styleName='disclosure' name='ios-call' color='green' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }
}
