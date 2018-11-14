import React from 'react'
import {View, StatusBar, Modal} from 'react-native'
import styles from './styles.js'
import Main from './Main'
import Password from './Password'
import autobind from 'autobind-decorator'

export default class Auth extends React.Component {
  static propTypes = {}

  state = {}

  @autobind
  open(opened) {
    this.setState({opened})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0069ff" barStyle="light-content" />
        <Main open={this.open} />
        <Modal
          animationType="slide"
          visible={this.state.opened === 'password'}
          onRequestClose={() => {
            this.setState({opened: null})
          }}>
          <Password open={this.open} />
        </Modal>
      </View>
    )
  }
}
