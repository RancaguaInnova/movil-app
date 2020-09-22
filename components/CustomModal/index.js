import React from 'react'
import styles from './styles.js'
import CustomHeader from '/components/CustomHeader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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

  render() {
    const visible = this.props.child !== null ? true : false
    return (
      <View>
        <Modal
          /* animationType='slide' */
          transparent={false}
          visible={visible}
          style={{ paddingTop: 0 }}
          onRequestClose={this.close}
        >
          <CustomHeader onClose={this.close} type='popup' />
          <View style={styles.container}>
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
