import React from 'react'
import {ObjectComponent} from 'simple-react-form'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'

export default class ObjectField extends ObjectComponent {
  static propTypes = {
    ...ObjectComponent.propTypes,
    style: PropTypes.object
  }

  static defaultProps = {
    ...ObjectComponent.defaultProps,
    style: {}
  }

  renderLabel() {
    if (!this.props.label) return
    return (
      <View>
        <Text>{this.props.label}</Text>
      </View>
    )
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return (
      <View>
        <Text style={{color: 'red'}}>{this.props.errorMessage}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.renderLabel()}
        {this.getChildrenComponents()}
        {this.renderErrorMessage()}
      </View>
    )
  }
}
