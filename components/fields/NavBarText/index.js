import React from 'react'
import {TextInput} from 'react-native'
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

  render() {
    return (
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
    )
  }
}
