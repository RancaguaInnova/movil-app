import React from 'react'
import styles from './styles'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import TimerMixin from 'react-timer-mixin'
import autobind from 'autobind-decorator'
import { Image as Img } from 'react-native-elements'
import { connect } from 'react-redux'
import { banners } from 'providers/StateProvider/Banner/actions'
import { cards } from 'providers/StateProvider/Cards/actions'
import Loading from 'providers/ApolloProvider/Loading'
import Image from 'react-native-remote-svg'
import { Ionicons } from '@expo/vector-icons'
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
    cards: PropTypes.func,
    list: PropTypes.array,
    loading: PropTypes.bool,
  }

  async componentDidMount() {
    try {
      await Promise.all([this.props.banners('home'), this.props.cards()])
    } catch (error) {
      console.log('Error getting services:', error)
    }
  }
  @autobind
  nextBanner() {
    const next = this.state.current < this.props.list.length - 1 ? this.state.current + 1 : 0
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
    const timer = this.state.timer
    const oldTimer = timer.shift()
    state.timer = timer
    this.setState(state)
    TimerMixin.clearTimeout(oldTimer)
  }

  componentWillUnmount() {
    this.state.timer.map(timer => {
      TimerMixin.clearTimeout(timer)
    })
  }

  renderIcon(card) {
    const type =
      !card.iconUrl || (card.iconUrl && card.iconUrl.trim() == '')
        ? 'icon'
        : card.iconUrl && card.iconUrl.indexOf('.svg') !== -1
        ? 'svg'
        : 'image'
    return (
      <View style={{ height: '90%', width: 80 }}>
        {type === 'icon' ? (
          <Ionicons name={card.icon} color='white' size={50} />
        ) : type === 'svg' ? (
          <Image source={{ uri: card.iconUrl }} style={{ height: '100%', width: '100%' }} />
        ) : (
          <View />
        )}
      </View>
    )
  }

  renderIndicator(indicator) {
    //console.log('indicator', indicator)
    return (
      <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.7,
            display: 'flex',
            backgroundColor: '#ff0648',
          }}
        >
          {
            <ListItem
              title={indicator.title}
              subtitle={indicator.subtitle}
              containerStyle={{ height: '100%', backgroundColor: '#ff0648' }}
              titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
              subtitleStyle={{ color: 'white' }}
              rightElement={
                <View>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>
                    {indicator.datum}
                    {indicator.measurementUnit}
                  </Text>
                </View>
              }
            />
          }
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            /* backgroundColor: '#ff0648', */
            /* backgroundColor: 'white', */
            backgroundColor: '#e7e6e6',
          }}
        >
          <Animatable.View
            animation='bounceIn'
            /* easing='ease-out' */
            iterationCount='infinite'
          >
            {this.renderIcon(indicator)}
          </Animatable.View>
        </View>
      </View>
    )
  }

  renderBanner(banner) {
    //console.log('banner', banner)
    return (
      <View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.7,
            display: 'flex',
          }}
        >
          <View>
            <Img
              source={{
                uri: banner.imageUrl,
              }}
              style={{ width: '100%', height: '100%' }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
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
      </View>
    )
  }

  renderSlider(banner, idx) {
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
              // If have > 1 banners
              if (this.props.list.length > 1) {
                const state = this.state
                state.timer.push(
                  TimerMixin.setTimeout(() => {
                    this.nextBanner()
                  }, 5000)
                )
                this.setState(state)
              }
            } else {
              this.hideBanner(idx)
            }
          }}
        >
          {banner.type === 'banner' ? this.renderBanner(banner) : this.renderIndicator(banner)}
        </Animatable.View>
      )
    } else {
      return <View key={idx} />
    }
  }

  render() {
    if (this.props.list && this.props.list.length > 0) {
      return (
        <View style={{ ...styles.container, backgroundColor: '#ff1248' }}>
          {this.props.list.map((banner, idx) => this.renderSlider(banner, idx))}
        </View>
      )
    } else if (this.props.loading) {
      return <View style={styles.container} />
    } else {
      return <View />
    }
  }
}

HomeBanner = Animatable.createAnimatableComponent(HomeBanner)

const mapDispatchToProps = dispatch => {
  return {
    banners: section => {
      dispatch(banners(section))
    },
    cards: () => {
      dispatch(cards())
    },
  }
}

const mapStateToProps = state => {
  const { banner, cards } = state
  const bannerList =
    banner && banner.data && banner.data.bannersBySection ? banner.data.bannersBySection : []
  const cardsList = cards && cards.data && cards.data.cardsList ? cards.data.cardsList : []
  //console.log('LIST!!!!!', bannerList.concat(cardsList))
  return {
    list: bannerList.concat(cardsList),
    loading:
      (banner && banner.loading === true) || (cards && cards.loading === true) ? true : false,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBanner)
