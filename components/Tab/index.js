import React from 'react'
import { View, Text } from 'react-native'
import TabBarIcon from 'components/TabBarIcon'
import Colors from '../../constants/Colors'

export default class Tab extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.focused ? '#a21635' : '#ff1248',
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <TabBarIcon color={this.props.color} focused={this.props.focused} name={this.props.icon} />
        <Text style={{ color: 'white' }}>{this.props.title}</Text>
      </View>
    )
  }
}
