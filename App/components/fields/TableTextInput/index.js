import React from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

export default class TableTextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    label: 'Input'
  }

  @autobind
  focus() {
    this.refs.input.focus()
  }

  renderBottom() {
    if (this.props.bottom) return
    return <View style={styles.bottomLine} />
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View style={styles.flex}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
            <TextInput
              ref="input"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit
              onChangeText={this.props.onChange}
              value={this.props.value}
              {...this.props.passProps}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderErrorMessage()}
        {this.renderBottom()}
      </View>
    )
  }
}
