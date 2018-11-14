import React from 'react'
import {View, TouchableWithoutFeedback, Text} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import {Circle} from 'react-native-progress'

export default class AppButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    height: PropTypes.number,
    loadingColor: PropTypes.string
  }

  static defaultProps = {
    textColor: '#505759',
    height: 40,
    fontSize: 18,
    loadingColor: '#111',
  }

  state = {}

  @autobind
  onPressIn() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: true})
  }

  @autobind
  onPressOut() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: false})
  }

  @autobind
  onPress() {
    if (this.props.loading || this.props.disabled) return
    this.props.onPress()
  }

  getContainerStyles() {
    return {
      height: this.props.height,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  getTextStyles() {
    const color = this.props.disabled ? '#ddd' : this.props.textColor
    const opacity = this.state.active ? 0.5 : 1
    return {
      textAlign: 'center',
      fontSize: this.props.fontSize,
      color,
      opacity
    }
  }

  renderLoading() {
    if (!this.props.loading) return
    const style = {}
    return (
      <View style={style}>
        <Circle size={this.props.height} indeterminate color={this.props.loadingColor} />
      </View>
    )
  }

  renderText() {
    if (this.props.loading) return
    const textStyles = this.getTextStyles()
    return <Text style={textStyles}>{this.props.title}</Text>
  }

  render() {
    const containerStyles = this.getContainerStyles()
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        style={styles.touchable}>
        <View style={containerStyles}>
          {this.renderText()}
          {this.renderLoading()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
