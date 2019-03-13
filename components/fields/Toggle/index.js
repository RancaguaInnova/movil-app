import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import { View, Text, Switch, Subtitle } from '@shoutem/ui'
import autobind from 'autobind-decorator'
import styles from './styles'

export default class Toggle extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    rut: PropTypes.bool
  }

  static defaultProps = {
    label: 'Input'
  }

  renderErrorMessage () {
    if (!this.props.errorMessage) return
    return <Text>{this.props.errorMessage}</Text>
  }

  @autobind
  handleChange (change) {
    return this.props.onChange(change)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <Subtitle>{this.props.label}</Subtitle>
        </View>
        <View style={styles.switch}>
          <Switch
            style={styles.switch}
            value={this.props.value}
            onValueChange={this.handleChange}
            {...this.props.passProps}
          />
        </View>
        {this.renderErrorMessage()}
      </View>
    )
  }
}

