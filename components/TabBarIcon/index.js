import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import { Text } from 'react-native'
import Colors from '../../constants/Colors'

export default class TabBarIcon extends React.Component {
	render() {
		return <Ionicons name={this.props.name} size={28} color={Colors.tabIconSelected} />
		/* return <Text> Icono</Text> */
	}
}
