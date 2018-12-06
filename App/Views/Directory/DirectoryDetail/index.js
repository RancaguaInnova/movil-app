import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import DirectoryDetailOverlay from './DirectoryDetailOverlay'
import DirectoryContactOfficer from './DirectoryContactOfficer'
export default class DirectoryDetail extends React.Component {
  static propTypes = {
    closeDetail: PropTypes.func,
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={() => this.props.closeDetail()} s>
        <Row styleName='small'>
          <Ionicons name='ios-arrow-back' size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle>Volver al directorio</Subtitle>
          </View>
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View
        styleName='content'
        style={{
          top: 0,
          height: '100%',
        }}
      >
        {this.renderBackButton()}
        <ScrollView style={{ flex: 1 }}>
          <DirectoryDetailOverlay />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
          <DirectoryContactOfficer />
        </ScrollView>
      </View>
    )
  }
}
