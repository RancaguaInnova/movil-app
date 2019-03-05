import React from 'react'
import PropTypes from 'prop-types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default class Icon extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string
  }

  render() {
    return (
      <MaterialCommunityIcons
        name={this.props.name}
        color={this.props.color}
        size={this.props.size}
        style={this.props.style}
      />
    )
  }
}
