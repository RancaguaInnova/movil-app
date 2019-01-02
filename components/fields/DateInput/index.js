import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Icon from '../../Icon'

export default class DateInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    dateFormat: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'Input',
    dateFormat: 'L',
    title: 'Selecciona una fecha'
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

  @autobind
  clear() {
    this.props.onChange(null)
  }

  getValue() {
    return this.props.value ? new Date(this.props.value) : null
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
  }

  renderLabel() {
    return <Text style={styles.placeholder}>{this.props.placeholder}</Text>
  }

  renderValue() {
    const date = this.getValue()
    if (!date) return this.renderLabel()
    const text = moment(date).format('L')
    return <Text style={styles.value}>{text}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.valueContainer}>
          <TouchableOpacity onPress={this.openDatePicker}>{this.renderValue()}</TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={this.clear}>
            <Icon name="close" size={15} />
          </TouchableOpacity>
        </View>
        <DateTimePicker
          {...this.props.passProps}
          isVisible={this.state.visible}
          onConfirm={this.onChange}
          onCancel={this.closeDatePicker}
          title={this.props.title}
          date={this.getValue() || new Date()}
        />
      </View>
    )
  }
}
