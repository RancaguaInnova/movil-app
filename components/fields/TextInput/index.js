import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Text } from 'react-native'
import { View, TextInput, Subtitle } from '@shoutem/ui'
import autobind from 'autobind-decorator'
import rut from 'rut.js'
import styles from './styles'

export default class TextInputField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    rut: PropTypes.bool,
  }

  static defaultProps = {
    label: 'Input',
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text>{this.props.errorMessage}</Text>
  }
  @autobind
  handleBlur() {
    if (this.props.rut) {
      return this.props.onChange(rut.format(this.props.value))
    }
    {
      return null
    }
  }

  @autobind
  handleChange(change) {
    return this.props.onChange(change)
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.label}</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            blurOnSubmit
            onBlur={this.handleBlur}
            onChangeText={this.handleChange}
            value={this.props.value}
            {...this.props.passProps}
            style={styles.input}
          />
        </View>
        {this.renderErrorMessage()}
      </View>
    )
  }
}
