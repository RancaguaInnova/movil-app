import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from '@shoutem/ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

export default class ComponentName extends React.Component {
  static propTypes = {
    iconName: PropTypes.string,
    label: PropTypes.string
  }

  renderIcon () {
    let { iconName } = this.props
    if (iconName) return <Icon name={iconName} size={20} />
    return null
  }

  render () {
    return (
      <Button style={styles.container}>
        {this.renderIcon()}
        <Text>{this.props.label}</Text>
      </Button>
    )
  }
}
