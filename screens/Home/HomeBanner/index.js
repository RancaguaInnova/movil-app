import React from 'react'
import styles from './styles'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import TimerMixin from 'react-timer-mixin'
import autobind from 'autobind-decorator'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { banners } from 'providers/StateProvider/Banner/actions'
import Loading from 'providers/ApolloProvider/Loading'
class HomeBanner extends React.Component {
  effect = {
    in: 'fadeInRight',
    out: 'fadeOutLeft',
  }

  state = { current: 0, previous: 0, hide: -1, timer: [] }

  list = [
    { type: 'card', icon: '', unit: '', title: 'Temperatura' },
    { type: 'card', icon: '', unit: '', title: 'Radiación' },
  ]

  static propTypes = {
    style: PropTypes.any,
    banners: PropTypes.func,
    banner: PropTypes.any,
  }

  async componentDidMount() {
    try {
      await this.props.banners('home')
    } catch (error) {
      console.log('Error getting services:', error)
    }
  }
  @autobind
  nextBanner() {
    const next = this.state.current < this.list.length - 1 ? this.state.current + 1 : 0
    const state = this.state
    state.previous = state.current
    state.current = next
    //state.timer.push(timer)
    this.setState(state)
  }

  @autobind
  hideBanner(idx) {
    const state = this.state
    state.hide = idx
    this.setState(state)
  }

  componentWillUnmount() {
    console.log('this.state.timer', this.state.timer)
    this.state.timer.map(timer => {
      TimerMixin.clearTimeout(timer)
    })
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
              const state = this.state
              state.timer.push(
                TimerMixin.setTimeout(() => {
                  this.nextBanner()
                }, 5000)
              )
              this.setState(state)
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
            <View>
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/cdir-tickets.appspot.com/o/400x134_feria_v3.png?alt=media&token=f3eb6c3c-9efa-47a2-b9dd-6be1c2b98b0b',
                }}
                style={{ width: '100%', height: '100%' }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            {/* <ListItem
              title={banner.title}
              subtitle='Tralala'
              containerStyle={{ height: '100%', backgroundColor: '#dbdbdb' }}
            /> */}
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
              animation='bounceIn'
              /* easing='ease-out' */
              iterationCount='infinite'
              style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}
            >
              + INFO
            </Animatable.Text>
          </View>
        </Animatable.View>
      )
    } else {
      return <View key={idx} />
    }
  }

  render() {
    if (this.props.banner.data) {
      return (
        <View style={styles.container}>
          {this.list.map((banner, idx) => this.renderBanner(banner, idx))}
        </View>
      )
    } else if (this.props.banner.loading) {
      return <View style={styles.container} />
    } else {
      return <View />
    }
    /* return (
      <View style={styles.container}>
        {// Ready
        this.props.banner.data
          ? this.list.map((banner, idx) => this.renderBanner(banner, idx))
          : null}
        {// Loading
        this.props.banner.loading ? <ActivityIndicator /> : null}
        {// Error
        this.props.banner.loading ? <ActivityIndicator /> : null}
      </View>
    ) */
  }
}

HomeBanner = Animatable.createAnimatableComponent(HomeBanner)

const mapDispatchToProps = dispatch => {
  return {
    banners: section => {
      dispatch(banners(section))
    },
  }
}

const mapStateToProps = state => {
  const { banner } = state
  return {
    banner,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBanner)
