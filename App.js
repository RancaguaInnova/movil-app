import { AppLoading, Asset, Icon, Linking } from 'expo'
import * as Font from 'expo-font'

import { Platform, StatusBar, StyleSheet, Text, View, YellowBox ,SafeAreaView} from 'react-native'
import { Provider, connect } from 'react-redux'
import { client, recoverSession } from 'providers/ApolloProvider'

import { ApolloProvider } from 'react-apollo'
import AppNavigator from './navigation/NewNavigator'
import CustomModal from 'components/CustomModal'
import MainMenu from 'components/MainMenu'
import React from 'react'
import SideMenu from 'react-native-side-menu'
import WebView from 'components/WebView'
import autobind from 'autobind-decorator'
/* import Drawer from 'react-native-drawer' */
import { closeDrawer } from 'providers/StateProvider/Drawer/actions'
import openApp from '/helpers/functions/openExternalApp/'
import store from 'providers/StateProvider'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'; // <-- Import app theme



YellowBox.ignoreWarnings([ 'Require cycle:' ])
YellowBox.ignoreWarnings([ 'Setting a timer' ])
export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		drawerOpen: false
	}

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleUrl)
	}

	async componentDidMount() {
		Linking.addEventListener('url', this._handleUrl)

		store.subscribe(() => {
			this.setState({ drawerOpen: store.getState().drawer.open })
		})
	}
	_handleUrl = async (event) => {
		try {
			const { navigation } = this.props
			let { path, queryParams } = Linking.parse(event.url)
			if (path == 'openApp') {
				await openApp(queryParams)
			}
		} catch (err) {}
	}

	@autobind
	onDrawerClose() {
		store.dispatch(closeDrawer())
	}
	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			)
		} else {
			return (
        <SafeAreaView style={{ flex: 1 }}>

        <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva}  theme={{ ...eva.light, ...theme }}>
				<ApolloProvider client={client}>
					<Provider store={store}>
						<WebView />
						<CustomModal />
       		<SideMenu
							menu={<MainMenu />}
							isOpen={this.state.drawerOpen}
							menuPosition='right'
							autoClosing={true}
							disableGestures={true}
							onChange={(isOpen) => (!isOpen && this.state.drawerOpen ? this.onDrawerClose() : null)}
						>
							<View style={styles.container}>
								{Platform.OS === 'ios' ? <StatusBar barStyle='default' /> : null}
								<AppNavigator />
							</View>
						</SideMenu>

					</Provider>
				</ApolloProvider>
      </ApplicationProvider>
        </SafeAreaView>
			)
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			/* Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]), */
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				// ...Icon.Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
				'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf')
			}),
			await recoverSession()
		])
	}

	_handleLoadingError = (error) => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error)
	}

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true })
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
