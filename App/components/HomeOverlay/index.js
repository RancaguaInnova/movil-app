import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo'
import InformationCard from './InformationCard'
import TopBar from './TopBar'
import { ImageBackground, Tile, Overlay } from '@shoutem/ui'

export default class HomeOverlay extends React.Component {
  renderInfoCard() {
    return <InformationCard />
  }

  render() {
    return (
      <ImageBackground
        styleName='large-banner'
        source={{
          /* uri: 'https://www.welcomechile.com/rancagua/imagenes/catedral-de-rancagua.jpg', */
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/6/67/Plaza_de_los_H%C3%A9roes_de_Rancagua_01.JPG',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            /* borderWidth: 1,
            borderColor: 'blue', */
          }}
        >
          <LinearGradient colors={['#0399f0', 'transparent']} style={{ height: '100%' }}>
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
