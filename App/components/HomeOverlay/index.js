import React from 'react'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles.js'
import { ImageBackground, Tile, Overlay, Subtitle, Title, Caption } from '@shoutem/ui'
import NotificationButton from 'App/components/NotificationButton'

export default class HomeOverlay extends React.Component {
  renderInfoCard() {
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
            width: '40%',
            height: '100%',
            /* justifyContent: 'center', */
            alignItems: 'stretch',
            padding: 0,
            /* borderColor: 'blue',
            borderWidth: 1, */
          }}
        >
          <Ionicons
            name='ios-sunny'
            size={55}
            style={{ color: 'yellow', /* borderWidth: 1, borderColor: 'green', */ paddingLeft: 37 }}
          />
          <Title
            styleName='bold h-center'
            style={{
              color: 'white',
              fontSize: 28,
              paddingTop: 15,
              /* borderWidth: 1,
              borderColor: 'yellow', */
            }}
          >
            9
          </Title>
        </View>
        <View style={{ width: '60%', paddingTop: 10 }}>
          <Title styleName='bold' style={{ color: 'white' }}>
            Radiación UV
          </Title>
          <Subtitle multiline={3}>No salga a la calle</Subtitle>
        </View>
      </View>
    )
  }

  renderTopBar() {
    return (
      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          padding: 5,
          justifyContent: 'center',
          alignItems: 'stretch',
          /* borderWidth: 1,
          borderColor: 'green', */
        }}
      >
        <View
          style={{
            /* borderColor: 'red',
            borderWidth: 1, */
            width: '80%',
          }}
        >
          <Title styleName='bold' style={{ color: 'white' }}>
            RANCAGUA
          </Title>
          <Caption style={{ color: 'white' }}>Viernes 14 de Diciembre, 2018</Caption>
        </View>
        <View
          style={{
            /* borderColor: 'black',
            borderWidth: 1, */
            width: '20%',
            alignItems: 'flex-end',
            paddingTop: 12,
          }}
        >
          <NotificationButton />
        </View>
      </View>
    )
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
            {this.renderTopBar()}

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
