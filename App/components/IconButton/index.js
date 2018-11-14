import React from 'react'
import {TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import autobind from 'autobind-decorator'

export default class IconButton extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    name: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.string
  }

  @autobind
  onPress() {
    this.props.onPress()
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={this.onPress}
        style={this.props.style}>
        <MaterialCommunityIcons
          name={this.props.name}
          color={this.props.color}
          size={this.props.size}
        />
      </TouchableOpacity>
    )
  }
}
