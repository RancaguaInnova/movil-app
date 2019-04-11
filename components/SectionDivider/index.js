import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { NavigationEvents } from 'react-navigation'
import TimerMixin from 'react-timer-mixin'
import {
  View,
  Text,
  TouchableOpacity,
  Divider,
  Caption,
  Overlay,
  ImageBackground,
} from '@shoutem/ui'

class SectionDivider extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    menu: PropTypes.array,
    modal: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    menu: [],
  }

  animation = {
    in: 'fadeInRight',
    out: '',
  }

  state = {
    animation: this.animation.in,
    menu: [],
    current: 0,
  }

  componentDidMount() {
    this.setState({ menu: this.props.menu })
  }

  render() {
    const title = this.props.title.toUpperCase()
    const menu = this.state.menu || []
    return (
      <View>
        {!this.props.modal ? (
          <NavigationEvents
            onWillFocus={payload => {
              this.setState({ animation: this.animation.in })
              TimerMixin.setTimeout(() => {
                return this.setState({ animation: this.animation.out })
              }, 250)
            }}
          />
        ) : null}

        {this.props.title !== '' ? (
          <Divider styleName='section-header' style={styles.divider}>
            <Animatable.View animation={this.state.animation} iterationCount={1} duration={200}>
              <Caption styleName='h-center' style={styles.caption} numberOfLines={2}>
                {title}
              </Caption>
            </Animatable.View>
          </Divider>
        ) : null}

        {menu.length > 0 ? (
          <Divider style={styles.divider}>
            {menu.map((item, key) => (
              <View
                key={key}
                styleName='vertical'
                style={{
                  alignSelf: 'center',
                  width: `${100 / menu.length}%`,
                  padding: 5,
                  backgroundColor: this.state.current !== key ? '#6d2533' : 'transparent',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    item.action()
                    this.setState({ current: key })
                  }}
                >
                  <Text styleName='h-center' style={{ color: 'white', fontSize: 14 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </Divider>
        ) : null}
      </View>
    )
  }
}

SectionDivider = Animatable.createAnimatableComponent(SectionDivider)
export default SectionDivider
