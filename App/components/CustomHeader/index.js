import React from 'react'
import { Header } from 'react-navigation'
import { View } from 'react-native'

export default class CustomHeader extends React.Component {
  render() {
    return <View>{<Header {...this.props} />}</View>
  }
}
