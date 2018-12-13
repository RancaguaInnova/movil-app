import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo'
import InformationCard from './InformationCard'
import TopBar from './TopBar'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { ImageBackground, Tile, Overlay } from '@shoutem/ui'
import TimerMixin from 'react-timer-mixin'
import Loading from '/App/Root/Loading'
import Retry from '/App/Root/Retry'
import autobind from 'autobind-decorator'
import { client } from '/App/Root/client'

export default class HomeOverlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: {
        list: [],
        status: 'loading',
        currentInfoCard: 0,
      },
    }
  }

  componentDidMount() {
    this.loadCards()
    TimerMixin.setInterval(() => {
      const cards = this.state.cards || []
      const index =
        cards.list.length > 0 && cards.currentInfoCard < cards.list.length - 1
          ? cards.currentInfoCard + 1
          : 0

      cards.currentInfoCard = index
      this.setState({
        ...cards,
      })
    }, 5000)
  }

  @autobind
  async loadCards() {
    try {
      const cardsQry = gql`
        {
          cardsList {
            datum
            measurementUnit
            icon
            color
            title
            subtitle
          }
        }
      `
      const result = await client.query({
        query: cardsQry,
      })
      const {
        data: { cardsList },
      } = result

      const cards = this.state.cards
      cards.list = cardsList
      cards.status = ''

      this.setState({
        ...cards,
      })
    } catch (error) {
      console.log('error', error)
      const cards = this.state.cards
      cards.list = []
      cards.status = 'error'
      this.setState({
        ...cards,
      })
    }
  }

  renderInfoCard() {
    const cards = this.state.cards
    return cards.status === 'loading' ? (
      <Loading />
    ) : cards.status == 'error' ? (
      <Retry callback={this.loadCards} />
    ) : (
      <InformationCard card={cards.list[this.state.cards.currentInfoCard]} />
    )
  }

  render() {
    return (
      <ImageBackground styleName='large-banner' source={require('App/assets/home_background.png')}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            /* borderWidth: 1,
            borderColor: 'blue', */
          }}
        >
          <LinearGradient colors={['#4fb2e3', 'transparent']} style={{ height: '100%' }}>
            <TopBar />

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'transparent',
                padding: 5,
                /* borderWidth: 1,
                borderColor: 'yellow', */
              }}
            >
              <Tile style={{ padding: 0 }}>
                <Overlay styleName='image-overlay' style={{ width: '100%', height: '100%' }}>
                  {this.renderInfoCard()}
                </Overlay>
              </Tile>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    )
  }
}
