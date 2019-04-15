import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Text } from 'react-native'
import { View, TextInput, Subtitle } from '@shoutem/ui'
import autobind from 'autobind-decorator'
import rut from 'rut.js'
import styles from './styles'
import _ from 'lodash'

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
  constructor(props) {
    super(props)
    this.state = { value: this.props.value }
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
      let r = rut.format(this.state.value)
      this.setState({ value: r })
    }
    return this.props.onChange(this.state.value)
  }

  @autobind
  handleChange(change) {
    this.setState({ value: change })
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Text>{this.props.label}</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={this.handleBlur}
            blurOnSubmit
            onChangeText={this.handleChange}
            value={this.state.value}
            {...this.props.passProps}
            style={styles.input}
          />
        </View>
        {this.renderErrorMessage()}
      </View>
    )
  }
}
