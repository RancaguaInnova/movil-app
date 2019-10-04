import React from 'react'
import autobind from 'autobind-decorator'
import _get from 'lodash/get'
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { callApi } from 'providers/ApiProvider'
import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

export default class QrScanner extends React.Component {
	state = {
		hasCameraPermission: null,
		scanned: false,
		result: null,
		wb: null
	}

	async componentDidMount() {
		this.getPermissionsAsync()
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	render() {
		const { hasCameraPermission, scanned, result } = this.state
		return (
			<View style={styles.container}>
				<SectionDivider title='Escaner QR' />
				{hasCameraPermission === null ? (
					<Text>Solicitando permisos para acceder a la cámara</Text>
				) : hasCameraPermission === false ? (
					<Text>No se otorgaron permisos para acceder a la cámara </Text>
				) : (
					<View
						style={{
							flex: 1,
							flexDirection: 'column'
						}}
					>
						{scanned && (
							<View>
								<Text style={{ textAlign: 'center', fontSize: 25 }}>Último escaner realizado:</Text>
								<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>{result}</Text>
							</View>
						)}

						<View
							style={{
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'flex-end'
							}}
						>
							{!scanned && (
								<BarCodeScanner
									onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
									style={StyleSheet.absoluteFillObject}
								/>
							)}

							{scanned && (
								<Button
									title={'Escanear nuevamente'}
									color='#ff0648'
									onPress={() => this.setState({ scanned: false, result: null, wb: null })}
								/>
							)}
						</View>
					</View>
				)}
			</View>
		)
	}

	handleBarCodeScanned = async ({ type, data }) => {
		try {
			let wb = null
			const matchResponse = await callApi(`/landings/match?url=${data}`)
			const match = _get(matchResponse, 'match', null)
			if (match && _get(match, 'action.name', '') !== '') {
				// Redirect url
				switch (_get(match, 'action.name', '')) {
					case 'redirect':
						let url = _get(match, 'action.value', '')
						wb = !this.state.wb ? await WebBrowser.openBrowserAsync(url) : this.state.wb
						break
					// To-do: Add more actions here!
				}
			} else if (!match && (data.indexOf('http://') !== -1 || data.indexOf('https://') !== -1)) {
				// Redirect
				wb = !this.state.wb ? await WebBrowser.openBrowserAsync(data) : this.state.wb
			}
			this.setState({ scanned: true, result: data, wb })
		} catch (error) {
			this.setState({ scanned: true, result: '', wb: null })
		}
	}
}
