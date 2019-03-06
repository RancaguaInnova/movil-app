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
import { event } from '/helpers/analytics'
import { connect } from 'react-redux'
import { closeWebView } from 'providers/StateProvider/WebView/actions'

class WebViewComponent extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    closeWebView: PropTypes.func,
    closeOnBack: PropTypes.bool,
  }

  static defaultProps = {
    closeWebView: () => {},
    closeOnBack: true,
  }

  state = {
    history: [],
  }

  @autobind
  close() {
    this.props.closeWebView()
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

// Redux
const mapStateToProps = state => {
  const {
    webview: { url, closeOnBack },
  } = state
  return {
    url,
    closeOnBack,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeWebView: () => {
      dispatch(closeWebView())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewComponent)
