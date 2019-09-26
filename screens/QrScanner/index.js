import React from 'react'
import autobind from 'autobind-decorator'
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

export default class QrScanner extends React.Component {
	static propTypes = {}

	state = {
		hasCameraPermission: null,
		scanned: false
	}

	async componentDidMount() {
		this.getPermissionsAsync()
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}
	render() {
		const { hasCameraPermission, scanned } = this.state

		if (hasCameraPermission === null) {
			return <Text>Solicitando permisos para acceder a la cámara</Text>
		}

		if (hasCameraPermission === false) {
			return <Text>No se otorgaron permisos para acceder a la cámara </Text>
		}
		return (
			<View style={styles.container}>
				<SectionDivider title='Escaner QR' />

				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-end'
					}}
				>
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>

					{scanned && (
						<Button title={'Escanear nuevamente'} onPress={() => this.setState({ scanned: false })} />
					)}
				</View>
			</View>
		)
	}

	handleBarCodeScanned = ({ type, data }) => {
		this.setState({ scanned: true })
		// alert(`Bar code with type ${type} and data ${data} has been scanned!`)
	}
}

//https://docs.expo.io/versions/latest/sdk/bar-code-scanner/
