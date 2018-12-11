import React from 'react'
import PropTypes from 'prop-types'
import { View, Button, Text, Spinner } from '@shoutem/ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import autobind from 'autobind-decorator'
import styles from './styles'

export default class ShoutemButton extends React.Component {
  static propTypes = {
    iconName: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
  }

  @autobind
  onPress () {
    if (this.props.loading || this.props.disabled) return
    this.props.onPress()
  }

  renderLoading () {
    if (!this.props.loading) return null
    return (
      <View
        style={{
          padding: 15,
          height: 52
        }}
      >
        <Spinner />
      </View>
    )
  }

  renderIcon () {
    let { iconName } = this.props
    if (iconName) return <Icon name={iconName} size={20} />
    return null
  }

  renderTextOrLoading () {
    if (this.props.loading) return <Spinner stlye={{ size: 'large' }} />
    return <Text style={styles.label}>{this.props.label}</Text>
  }

  render () {
    return (
      <Button
        style={styles.container}
        onPress={this.onPress}
        disabled={this.props.disabled}
        loading
      >
        {this.renderIcon()}
        {this.renderTextOrLoading()}
      </Button>
    )
  }
}
