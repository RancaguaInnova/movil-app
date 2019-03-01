import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'
import autobind from 'autobind-decorator'
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
import { Header } from 'react-native-elements'
import { Text, TouchableOpacity, NavigationBar, Title } from '@shoutem/ui'
import { event } from '/helpers/analytics'

export default class CustomHeader extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    onClose: () => {},
    type: 'main',
  }
  showMenu() {
    console.log('show menu')
  }

  showNotifications() {
    console.log('show notifications')
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
      <TouchableHighlight
        onPress={this.showNotifications}
        style={styles.bell}
        underlayColor='white'
      >
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
        centerComponent={this.renderNotifications()}
        /* centerComponent={{
          icon: 'menu',
          color: 'red',
          onPress: this.showMenu,
        }} */
        centerContainerStyle={{ paddingLeft: 200 }}
        rightComponent={{
          icon: 'menu',
          color: '#969696',
          size: 35,
          onPress: this.showMenu,
        }}
        rightContainerStyle={{ fontSize: 20 }}
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
          color: 'black',
          onPress: this.showMenu,
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
