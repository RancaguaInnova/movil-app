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
    loading: PropTypes.bool,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: '#fe0747',
  }

  @autobind
  onPress() {
    if (this.props.loading || this.props.disabled) return
    this.props.onPress()
  }

  renderLoading() {
    if (!this.props.loading) return null
    return (
      <View
        style={{
          padding: 15,
          height: 52,
        }}
      >
        <Spinner />
      </View>
    )
  }

  renderIcon() {
    let { iconName, loading } = this.props
    if (iconName && !loading) {
      return <Icon style={styles.icon} name={iconName} size={20} />
    }
    return null
  }

  renderComponentsOrLoading() {
    let { label, loading } = this.props
    if (loading) return <Spinner style={{ size: 'small', color: '#fff' }} />
    return <Text style={styles.label}>{label}</Text>
  }

  render() {
    const btnStyle = this.props.disabled ? styles.disabled : styles.container
    if (!this.props.disabledn && this.props.color) {
      btnStyle.backgroundColor = this.props.color
    }

    return (
      <Button style={btnStyle} onPress={this.onPress} disabled={this.props.disabled} loading>
        {this.renderIcon()}
        {this.renderComponentsOrLoading()}
      </Button>
    )
  }
}
