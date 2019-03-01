import React from 'react'
import styles from './styles.js'
import CustomHeader from '/components/CustomHeader'
import WebViewFooter from './WebViewFooter'
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
import { Text, TouchableOpacity, NavigationBar, Title } from '@shoutem/ui'
//import Loading from 'providers/ApolloProvider/Loading'
/* import Retry from 'providers/ApolloProvider/Retry'

import Error from 'providers/ApolloProvider/ApolloError'
import { bannerBySectionQry, getMeQry } from 'providers/ApolloProvider/queries'
import { Query } from 'react-apollo'
import { WebBrowser } from 'expo'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { Alert } from 'react-native'
import { parseUrl } from '/helpers/url' */
import { event } from '/helpers/analytics'

export default class WebViewComponent extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    onClose: PropTypes.func,
    closeOnBack: PropTypes.boolean,
  }

  static defaultProps = {
    url: '',
    onClose: () => {},
    closeOnBack: false,
  }

  state = {
    history: [],
  }

  @autobind
  close() {
    console.log('close!')
    this.props.onClose()
  }

  @autobind
  goBack() {
    const history = this.state && this.state.history ? this.state.history : []
    if (this.webViewRef && !this.props.closeOnBack) {
      this.webViewRef.goBack()

      if (history.length > 1) {
        history.pop()
        this.setState({ history })
      } else {
        this.close()
      }
    } else if (this.props.closeOnBack) {
      this.close()
    }
  }

  @autobind
  onNavigationStateChange(webviewState) {
    const history = this.state && this.state.history ? this.state.history : []
    if (history.indexOf(webviewState.url) === -1) {
      history.push(webviewState.url)
      this.setState({ history })
    }
  }

  onRequestClose() {}

  render() {
    const visible = this.props.url && this.props.url.trim() !== '' ? true : false
    return (
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={visible}
          onRequestClose={this.onRequestClose}
        >
          <View style={styles.container}>
            <CustomHeader onClose={this.close} type='popup' />
            <View style={styles.webViewContainer}>
              <WebView
                ref={r => (this.webViewRef = r)}
                source={{ uri: this.props.url }}
                startInLoadingState={true}
                onNavigationStateChange={this.onNavigationStateChange}
              />
            </View>
            <WebViewFooter
              goBack={this.goBack}
              title={this.props.closeOnBack ? 'Cerrar' : 'Atrás'}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
