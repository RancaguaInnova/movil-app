import React from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableHighlight, View } from 'react-native'
import {
  ApplicationProvider,
  Button, Divider,
  Icon,
  IconRegistry, ListItem, TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { default as theme } from './theme.json'
import { ApolloProvider } from 'react-apollo'
import { client } from './providers/ApolloProvider'
import { Provider } from 'react-redux'
import store from './providers/StateProvider'
import AppNavigator from './navigation/NewNavigator'
import { EvaIconsPack } from '@ui-kitten/eva-icons'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: { width: 180, height: 38, resizeMode: 'contain' },
})

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const App = () => {
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );
  const renderSettingsAction = () => (
    <TopNavigationAction icon={MenuIcon}/>
  );

const renderTitleApp=()=>(
  <TouchableHighlight>
    <Image style={styles.image} source={require('/assets/images/logo.png')} />
  </TouchableHighlight>
)


  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <TopNavigation
              title={renderTitleApp}
              accessoryRight={renderSettingsAction}
            />
            <Divider/>
            <View style={styles.container}>
              {Platform.OS === 'ios' ? <StatusBar barStyle='default' /> : null}
              <AppNavigator />
            </View>
          </Provider>
        </ApolloProvider>
      </ApplicationProvider>
    </SafeAreaView>
  )
}

export default App

