import React from 'react'
import {View, Text, TextInput} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'

export default class TextInputField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    passProps: PropTypes.object
  }

  static defaultProps = {
    label: 'Input'
  }

  focus() {
    this.refs.input.focus()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.label.toUpperCase()}
        </Text>
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
    )
  }
}
