import React from 'react'
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Modal from 'react-native-modalbox'

export default class TableSelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    options: PropTypes.array
  }

  static defaultProps = {
    label: 'Input'
  }

  state = {}

  @autobind
  focus() {
    this.setState({open: true})
  }

  getValue() {
    return this.props.value
  }

  getText() {
    if (!this.props.value) return
    const item = this.props.options.find(option => option.value === this.props.value)
    if (!item) return
    return item.label
  }

  getModalStyle() {
    const height = Dimensions.get('window').height * 0.6
    return {
      height,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#f5f5f5'
    }
  }

  renderBottom() {
    if (this.props.bottom) return
    return <View style={styles.bottomLine} />
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
  }

  renderValue() {
    return <Text style={styles.value}>{this.getText()}</Text>
  }

  renderOptions() {
    if (!this.state.open) return
    return this.props.options.map((option, index) => {
      const onPress = () => {
        this.props.onChange(option.value)
        this.refs.modal.close()
      }
      return (
        <View key={index} style={styles.item}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.itemLabel}>{option.label}</Text>
          </TouchableOpacity>
          {this.props.options.length !== index + 1 ? <View style={styles.bottomLine} /> : null}
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.focus}>
          <View style={styles.flex}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
            <View style={styles.valueContainer}>{this.renderValue()}</View>
          </View>
        </TouchableOpacity>
        {this.renderErrorMessage()}
        {this.renderBottom()}
        <Modal
          ref="modal"
          coverScreen
          backButtonClose
          swipeToClose={false}
          style={this.getModalStyle()}
          isOpen={this.state.open}
          onClosed={() => this.setState({open: false})}
          position="bottom">
          <View style={{flex: 1}}>
            <View style={styles.selectLabel}>
              <Text style={styles.selectLabelText}>{this.props.label}</Text>
            </View>
            <ScrollView style={styles.modalScrollView}>{this.renderOptions()}</ScrollView>
          </View>
        </Modal>
      </View>
    )
  }
}
