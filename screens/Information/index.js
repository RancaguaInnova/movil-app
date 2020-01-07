import React, { Component } from 'react'
import { Modal, View, TouchableHighlight, Alert, Image, ScrollView, StyleSheet, Button } from 'react-native'
import CustomHeader from 'components/CustomHeader'
import { WebView } from 'react-native'
import styles from './styles.js'
import { NavigationEvents } from 'react-navigation'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import { parseUrl } from '/helpers/url'
import { connect } from 'react-redux'

class Information extends Component {
	static propTypes = {
		session: PropTypes.object
	}

	static navigationOptions = {
		header: <CustomHeader type="main" />
	}
	mainUrl = 'https://webviews.smartrancagua.com/view/information'

	constructor(props) {
		super(props)
		this.state = {
			url: this.mainUrl,
			history: []
		}
	}
	componentDidMount() {
		this.refresh()
	}

	@autobind
	refresh() {
		let session = this.props.session
		if (session && session.user && session.user.userToken) {
			let finalUrl
			finalUrl = parseUrl(this.mainUrl, {
				token: session.user.userToken,
				refhesh: Math.floor(Math.random() * 100 + 1)
			})
			this.setState({ url: finalUrl })
		} else {
			let finalUrl
			finalUrl = parseUrl(this.mainUrl, {
				refhesh: Math.floor(Math.random() * 100 + 1)
			})
			this.setState({ url: finalUrl })
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents onWillFocus={this.refresh} />
				<View style={styles.webViewContainer}>
					<WebView
						key="comp1"
						useWebKit={true}
						style={{ flex: 1 }}
						ref={r => (this.webViewRef = r)}
						onNavigationStateChange={this.onNavigationStateChange}
						source={{ uri: this.state.url }}
						startInLoadingState={true}
						geolocationEnabled={true}
						originWhitelist={['file://*', 'http://*', 'https://*']}
					/>
				</View>
			</View>
		)
	}
}
const mapStateToProps = state => {
	const { auth: { session } } = state
	return {
		session
	}
}

export default connect(mapStateToProps)(Information)
