import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { TouchableHighlight, Image} from 'react-native'
import { Header } from 'react-native-elements'
import { openDrawer } from 'providers/StateProvider/Drawer/actions'
import { openModal } from 'providers/StateProvider/Modal/actions'

import Notifications from 'screens/Notifications'

class CustomHeader extends React.Component {
	static propTypes = {
		onClose: PropTypes.func,
		type: PropTypes.string,
		openDrawer: PropTypes.func,
		openModal: PropTypes.func
	}

	static defaultProps = {
		type: 'main'
	}

	@autobind
	showMenu() {
		this.props.openDrawer()
	}

	@autobind
	showNotifications() {
		this.props.openModal(<Notifications />)
	}

	renderLogo() {
		return (
			<TouchableHighlight>
				<Image style={styles.image} source={require('/assets/images/logo.png')} />
			</TouchableHighlight>
		)
	}

	renderNotifications() {
		return (
			<TouchableHighlight onPress={this.showNotifications} style={styles.bell} underlayColor='white'>
				<Image
					style={styles.notificationImage}
					source={require('/assets/images/bell.png')}
					/* source={require('/assets/images/bell_active.png')} */
				/>
			</TouchableHighlight>
		)
	}

	renderMain() {
		return (
			<Header
				leftComponent={this.renderLogo()}
				centerContainerStyle={{ paddingLeft: 100 }}
				rightComponent={{
					icon: 'menu',
					color: '#969696',
					size: 40,
					onPress: this.showMenu
				}}
				containerStyle={styles.header}
			/>
		)
	}

	renderPopUp() {
		return (
			<Header
				leftComponent={this.renderLogo()}
				/* centerComponent={{ text: 'MY TITLE', style: { color: 'black' } }} */
				rightComponent={{
					icon: 'close',
					color: '#969696',
					size: 40,
					onPress: this.props.onClose
				}}
				containerStyle={styles.header}
			/>
		)
	}

	render() {
		switch (this.props.type) {
			case 'popup':
				return this.renderPopUp()
			default:
				return this.renderMain()
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		openDrawer: () => {
			dispatch(openDrawer())
		},
		openModal: (child) => {
			dispatch(openModal(child))
		}
	}
}

const mapStateToProps = (state) => {
	const { auth: { session, loading } } = state
	return {
		session
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)
