import React from 'react'
import styles from './styles.js'
import CustomHeader from '/components/CustomHeader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WebView } from 'react-native'
import autobind from 'autobind-decorator'
import { closeModal } from 'providers/StateProvider/Modal/actions'
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

class CustomModal extends React.Component {
  static propTypes = {
    child: PropTypes.node,
    content: PropTypes.node,
    closeModal: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    content: <View />,
  }

  @autobind
  close() {
    this.props.closeModal()
  }

  onRequestClose() {}

  render() {
    const visible = this.props.child !== null ? true : false
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
            <View style={styles.modalContainer}>{this.props.child}</View>
          </View>
        </Modal>
      </View>
    )
  }
}

// Redux
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    },
  }
}

const mapStateToProps = state => {
  const {
    modal: { child },
  } = state
  return {
    child,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomModal)
