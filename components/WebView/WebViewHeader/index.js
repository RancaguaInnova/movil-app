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

export default class WebViewHeader extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
  }

  static defaultProps = {
    onClose: () => {},
  }
  render() {
    return (
      <Header
        leftComponent={<Image style={styles.image} source={require('/assets/images/logo.png')} />}
        /* centerComponent={{ text: 'MY TITLE', style: { color: 'black' } }} */
        rightComponent={{
          icon: 'close',
          color: 'black',
          onPress: this.props.onClose,
        }}
        containerStyle={styles.header}
      />
    )
  }
}
