import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Subtitle, Title } from '@shoutem/ui'

export default class InformationCard extends React.Component {
  render() {
    const card = this.props.card

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          /* borderWidth: 1,
          borderColor: 'red', */
        }}
      >
        <View
          style={{
            width: '30%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
            padding: 0,
            /* borderColor: 'blue',
            borderWidth: 1, */
          }}
        >
          <Ionicons
            name={card.icon}
            size={55}
            style={{
              color: card.color,
              /* borderWidth: 1, borderColor: 'green', */ paddingLeft: 37,
            }}
          />
          <Title
            styleName='bold h-center'
            style={{
              color: card.color,
              fontSize: 28,
              paddingTop: 15,
              /* borderWidth: 1,
              borderColor: 'yellow', */
            }}
          >
            {card.datum} {card.measurementUnit}
          </Title>
        </View>
        <View style={{ width: '70%', paddingTop: 10 /*  borderWidth: 1, borderColor: 'yellow' */ }}>
          <Title styleName='bold' style={{ color: 'white' }}>
            {card.title}
          </Title>
          <Subtitle multiline={3} style={{ fontSize: 10 }}>
            {card.subtitle}
          </Subtitle>
        </View>
      </View>
    )
  }
}
