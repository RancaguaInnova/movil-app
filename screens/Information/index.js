import React, { Component } from 'react'
import {
  Modal,
  View,
  TouchableHighlight,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native'
import CustomHeader from 'components/CustomHeader'
import { WebView } from 'react-native'
import styles from './styles.js'
import { NavigationEvents } from 'react-navigation'
import autobind from 'autobind-decorator'
export default class Information extends Component {
  static navigationOptions = {
    header: <CustomHeader type='main' />,
  }
  mainUrl = 'https://webviews.smartrancagua.com/view/information'

  constructor(props) {
    super(props)
    this.state = {
      url: this.mainUrl,
      history: [],
    }
  }

  @autobind
  refresh() {
    var newUrl = this.mainUrl + '?refhesh=' + Math.floor(Math.random() * 100 + 1)
    this.setState({ url: newUrl })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.refresh} />
        <View style={styles.webViewContainer}>
          <WebView
            key='comp1'
            ref={r => (this.webViewRef = r)}
            onNavigationStateChange={this.onNavigationStateChange}
            source={{ uri: this.state.url }}
            startInLoadingState={true}
            scalesPageToFit={true}
            geolocationEnabled={true}
          />
        </View>
      </View>
    )
  }
}
