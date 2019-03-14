import React from 'react'
import styles from './styles.js'
import CustomHeader from '/components/CustomHeader'
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

export default class CustomModal extends React.Component {
  static propTypes = {
    visible: PropTypes.boolean,
    content: PropTypes.node,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    content: <View />,
    onClose: () => {},
  }

  @autobind
  close() {
    console.log('close!')
    this.props.onClose()
  }

  onRequestClose() {}

  render() {
    return (
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.props.visible}
          onRequestClose={this.onRequestClose}
        >
          <View style={styles.container}>
            <CustomHeader onClose={this.close} type='main' />
            <View style={styles.modalContainer}>
              <Text>Contenido</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
