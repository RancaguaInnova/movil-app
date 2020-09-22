import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView,View } from 'react-native'
//import { NavigationEvents } from 'react-navigation'
import { pageHit } from '/helpers/analytics'
import styles from './styles'
import NewsList from './NewsList'
import moment from '../../helpers/date/moment'
import HomeBanner from './HomeBanner'
import CustomHeader from 'components/CustomHeader'
import Loading from 'components/Loading'
import { connect } from 'react-redux'
import { requestSession, registerDevice } from 'providers/StateProvider/Auth/actions'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const pageName = 'Home'

class Home extends React.Component {
	static propTypes = {
		requestSession: PropTypes.func.isRequired,
		session: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired
	}

	static navigationOptions = {
		header: <CustomHeader type='main' />
	}

	async componentDidMount() {
		this.props.requestSession()
		try {
			await this.registerForPushNotifications()
		} catch (error) {
			console.log('Error registering for push notifications:', error)
		}
	}

	async registerForPushNotifications() {
		try {
			const permissions = await Permissions.getAsync(Permissions.NOTIFICATIONS)

			const { status: existingStatus } = permissions
			let finalStatus = existingStatus

			// only ask if permissions have not already been determined, because
			// iOS won't necessarily prompt the user a second time.
			if (existingStatus !== 'granted') {
				// Android remote notification permissions are granted during the app
				// install, so this will only ask on iOS
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
				finalStatus = status
			}

			// Stop here if the user did not grant permissions
			if (finalStatus !== 'granted') return

			// Get the token that uniquely identifies this device
			let deviceToken = await Notifications.getExpoPushTokenAsync()
			let userId = this.props.session.userId

			// Call the GraphQL API to save the users device push token.
			if (userId && deviceToken) await this.props.registerDevice({ userId, deviceToken })
		} catch (error) {
			console.log('Error registering device token:', error)
		}
	}

	render() {
		pageHit(pageName)
		const title = `RANCAGUA, ${moment().format('DD MMMM [DE] YYYY').toUpperCase()}`
		if (this.props.loading) return <Loading />
		return (
			<View style={styles.mainContainer}>
        {/*<NavigationEvents onWillFocus={(payload) => pageHit( pageName )} />*/}
				<HomeBanner />
				<ScrollView style={styles.container}>
					<NewsList />
				</ScrollView>
			</View>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		requestSession: () => {
			dispatch(requestSession())
		},
		registerDevice: (userId, token) => {
			dispatch(registerDevice(userId, token))
		}
	}
}

const mapStateToProps = (state) => {
	const { auth: { session, loading } } = state
	return {
		session,
		loading
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
