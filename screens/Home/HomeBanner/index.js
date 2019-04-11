import React from 'react'
import styles from './styles'
import { View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import TimerMixin from 'react-timer-mixin'
import autobind from 'autobind-decorator'

class HomeBanner extends React.Component {
  effect = {
    in: 'fadeInRight',
    out: 'fadeOutLeft',
  }

  state = { current: 0, previous: 0, hide: -1 }

  list = [
    { type: 'card', icon: '', unit: '', title: 'Temperatura' },
    { type: 'card', icon: '', unit: '', title: 'Radiación' },
  ]

  static propTypes = {
    style: PropTypes.any,
  }

  @autobind
  nextBanner() {
    const next = this.state.current < this.list.length - 1 ? this.state.current + 1 : 0
    const state = this.state
    state.previous = state.current
    state.current = next
    this.setState(state)
  }

  @autobind
  hideBanner(idx) {
    const state = this.state
    state.hide = idx
    this.setState(state)
  }

  renderBanner(banner, idx) {
    if (
      (idx !== this.state.hide && idx === this.state.current) ||
      (idx !== this.state.hide && idx === this.state.previous)
    ) {
      const effect = this.state.current === idx ? this.effect.in : this.effect.out
      const delay = 200
      return (
        <Animatable.View
          key={idx}
          animation={effect}
          duration={200}
          delay={delay}
          style={styles.bannerContainer}
          onAnimationEnd={() => {
            if (effect === this.effect.in) {
              TimerMixin.setTimeout(() => {
                this.nextBanner()
              }, 5000)
            } else {
              this.hideBanner(idx)
            }
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              flex: 0.7,
              display: 'flex',
            }}
          >
            <ListItem
              title={banner.title}
              subtitle='Tralala'
              containerStyle={{ height: '100%', backgroundColor: '#dbdbdb' }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ff0648',
            }}
          >
            <Animatable.Text
              animation='pulse'
              easing='ease-out'
              iterationCount='infinite'
              style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}
            >
              + INFO
            </Animatable.Text>
          </View>
        </Animatable.View>
      )
    } else {
      return <View />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.list.map((banner, idx) => this.renderBanner(banner, idx))}
      </View>
    )
  }
}

HomeBanner = Animatable.createAnimatableComponent(HomeBanner)
export default HomeBanner
