import React from 'react'
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import {iOSColors} from 'react-native-typography'

export default class AppButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    containerStyle: PropTypes.any,
    buttonStyle: PropTypes.any,
    textStyle: PropTypes.any,
    height: PropTypes.number
  }

  static defaultProps = {
    backgroundColor: '#62B5E5',
    textColor: '#fff',
    height: 52,
    containerStyle: {},
    buttonStyle: {},
    textStyle: {}
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
    const backgroundColor =
      this.props.loading || this.props.disabled ? '#eeeeee' : this.props.backgroundColor
    return [
      {
        backgroundColor,
        height: this.props.height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2
      },
      this.props.buttonStyle
    ]
  }

  getTextStyles() {
    const color = this.props.disabled ? '#ddd' : this.props.textColor
    return [
      {
        color,
        fontSize: 22,
        fontWeight: '600'
      },
      this.props.textStyle
    ]
  }

  renderLoading() {
    if (!this.props.loading) return
    const style = {
      padding: 15,
      height: this.props.height
    }
    return (
      <View style={style}>
        <ActivityIndicator />
      </View>
    )
  }

  renderText() {
    if (this.props.loading) return
    const textStyles = this.getTextStyles()
    return <Text style={textStyles}>{this.props.title}</Text>
  }

  render() {
    const touchableStyles = this.getContainerStyles()
    return (
      <TouchableOpacity
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        disabled={this.state.loading || this.state.disabled}
        style={touchableStyles}>
        <View>
          {this.renderText()}
          {this.renderLoading()}
        </View>
      </TouchableOpacity>
    )
  }
}
