import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

export default class TableTextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    label: 'Input',
    dateFormat: 'L'
  }

  state = {}

  @autobind
  focus() {
    this.openDatePicker()
  }

  @autobind
  openDatePicker() {
    this.setState({visible: true})
  }

  @autobind
  closeDatePicker() {
    this.setState({visible: false})
  }

  @autobind
  onChange(date) {
    this.props.onChange(date)
    this.closeDatePicker()
  }

  getValue() {
    return this.props.value ? new Date(this.props.value) : null
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
    const date = this.getValue()
    if (!date) return
    const text = moment(date).format('L')
    return <Text style={styles.value}>{text}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openDatePicker}>
          <View style={styles.flex}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
            <View style={styles.valueContainer}>{this.renderValue()}</View>
          </View>
        </TouchableOpacity>
        <DateTimePicker
          {...this.props.passProps}
          isVisible={this.state.visible}
          onConfirm={this.onChange}
          onCancel={this.closeDatePicker}
          date={this.getValue()}
        />
        {this.renderErrorMessage()}
        {this.renderBottom()}
      </View>
    )
  }
}
