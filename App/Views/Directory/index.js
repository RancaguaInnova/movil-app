import React from 'react'
import { Text } from 'react-native'
import styles from './styles.js'
import DirectoryList from './DirectoryList'
import DirectoryDetail from './DirectoryDetail'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { Row, Image, Subtitle, Divider, TouchableOpacity, View, Caption } from '@shoutem/ui'

export default class Directory extends React.Component {
  static propTypes = {
    me: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { selected: false }
    this.showDetail = this.showDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
  }

  showDetail(item) {
    console.log('item', item)
    this.setState({ selected: item })
  }

  closeDetail() {
    this.setState({ selected: false })
  }

  render() {
    const selected = this.state.selected
    return (
      <View styleName='content' style={{ justifyContent: 'center', flex: 1, paddingTop: 0 }}>
        {selected ? (
          <DirectoryDetail closeDetail={this.closeDetail} />
        ) : (
          <DirectoryList showDetail={this.showDetail} />
        )}
      </View>
    )
  }
}
