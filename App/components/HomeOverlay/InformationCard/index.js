import React from 'react'
import { View } from 'react-native'
import { container, text, icon } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { Subtitle, Title } from '@shoutem/ui'

export default class InformationCard extends React.Component {
  renderIndicator(indicator) {
    return (
      <View style={container.indicator}>
        <Ionicons
          name={indicator.icon}
          size={55}
          style={{ ...icon.indicator, color: indicator.color }}
        />
        <Title styleName='bold h-center' style={{ ...text.indicatorTitle, color: indicator.color }}>
          {indicator.datum} {indicator.measurementUnit}
        </Title>
      </View>
    )
  }

  renderDetail(card) {
    return (
      <View style={container.detail}>
        <Title styleName='bold' style={text.detailTitle}>
          {card.title}
        </Title>
        <Subtitle multiline={3} style={text.detailSubtitle}>
          {card.subtitle}
        </Subtitle>
      </View>
    )
  }

  render() {
    const card = this.props.card

    return (
      <View style={container.main}>
        {this.renderIndicator(card)}

        {this.renderDetail(card)}
      </View>
    )
  }
}
