import React from 'react'
import CardSilder from 'react-native-cards-slider'
import { ImageBackground, View, Text, Image as Img } from '@shoutem/ui'
import Image from 'react-native-remote-svg'
import { cardListQry } from 'queries'
import styles from './styles'
import { client } from 'providers/ApolloProvider'
import Loading from 'providers/ApolloProvider/Loading'
import Retry from 'providers/ApolloProvider/Retry'
import autobind from 'autobind-decorator'
import { ApolloProvider } from 'react-apollo'
import { Ionicons } from '@expo/vector-icons'
//
export default class HomeOverlay extends React.Component {
  state = {
    cards: {
      list: [],
      status: 'loading',
    },
  }

  componentDidMount() {
    this.loadCards()
  }

  @autobind
  async loadCards() {
    try {
      const result = await client.query({
        query: cardListQry,
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

  renderIcon(card) {
    const type =
      !card.iconUrl || (card.iconUrl && card.iconUrl.trim() == '')
        ? 'icon'
        : card.iconUrl && card.iconUrl.indexOf('.svg') !== -1
        ? 'svg'
        : 'image'
    return (
      <View styleName='vertical' style={styles.leftColumn}>
        {type === 'icon' ? (
          <Ionicons name={card.icon} color={card.color} size={50} />
        ) : type === 'svg' ? (
          <Image source={{ uri: card.iconUrl }} style={{ marginTop: 20 }} />
        ) : (
          <Img
            styleName='small'
            source={{
              uri: card.iconUrl,
            }}
          />
        )}
      </View>
    )
  }

  renderCard(card) {
    return (
      <View style={styles.informationCard} key={card.title}>
        <View style={styles.informationRow}>
          {this.renderIcon(card)}
          <View styleName='vertical' style={styles.rightColumn}>
            <Text style={{ color: 'rgb(68,78,82)', fontSize: 20, fontWeight: 'bold' }}>
              {card.title}
            </Text>
          </View>
        </View>
        <View style={styles.informationRow}>
          <View style={styles.leftColumn}>
            <Text
              style={{
                color: card.color ? card.color : 'rgb(68,78,82)',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {card.datum}
              {card.measurementUnit}
            </Text>
          </View>
          <View styleName='vertical' style={styles.subtitle}>
            <Text styleName='h-center' style={{ color: 'rgb(68,78,82)', fontSize: 14 }}>
              {card.subtitle}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderSlider(list) {
    if (list && list.length > 0) {
      return (
        <CardSilder
          autoplay
          interval={5000}
          showsHorizontalScrollIndicator
          style={{
            /* borderColor: 'green', borderWidth: 1,  width: '100%', */ padding: 0,
          }}
        >
          {list.map(card => this.renderCard(card))}
        </CardSilder>
      )
    } else {
      return <View />
    }
  }

  render() {
    return (
      <View style={{ flex: 0.4 /*  borderColor: 'red', borderWidth: 1 */ }}>
        <ImageBackground
          styleName='large-banner'
          source={require('../../../assets/images/home_background.png')}
          style={{ height: '100%', padding: 0 }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,1, 0.2)',
            }}
          >
            {this.state.cards.status === 'loading' ? (
              <Loading />
            ) : this.state.cards.status === 'error' ? (
              <Retry callback={this.loadCards} />
            ) : (
              this.renderSlider(this.state.cards.list)
            )}
          </View>
        </ImageBackground>
      </View>
    )
  }
}
