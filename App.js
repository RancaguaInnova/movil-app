import React from 'react'
import { Platform, StatusBar, StyleSheet, View, YellowBox, Text } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import { ApolloProvider } from 'react-apollo'
import autobind from 'autobind-decorator'
import { connect, Provider } from 'react-redux'
/* import Drawer from 'react-native-drawer' */
import { closeDrawer } from 'providers/StateProvider/Drawer/actions'
import WebView from 'components/WebView'
import CustomModal from 'components/CustomModal'
import { recoverSession, client } from 'providers/ApolloProvider'
import MainMenu from 'components/MainMenu'
import store from 'providers/StateProvider'
import SideMenu from 'react-native-side-menu'

YellowBox.ignoreWarnings(['Require cycle:'])
YellowBox.ignoreWarnings(['Setting a timer'])
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    drawerOpen: false,
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ drawerOpen: store.getState().drawer.open })
    })
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
        <ApolloProvider client={client}>
          <Provider store={store}>
            <SideMenu
              menu={<MainMenu />}
              isOpen={this.state.drawerOpen}
              menuPosition='right'
              autoClosing={true}
              disableGestures={true}
            >
              <WebView />
              <CustomModal />
              <View style={styles.container}>
                {Platform.OS === 'ios' ? <StatusBar barStyle='default' /> : null}
                <AppNavigator />
              </View>
            </SideMenu>
          </Provider>
        </ApolloProvider>
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
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
        'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf'),
      }),
      await recoverSession(),
    ])
  }

  _handleLoadingError = error => {
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
    backgroundColor: '#fff',
  },
})
