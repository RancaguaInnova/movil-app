import React from 'react'
import { Text, View } from 'react-native'
import CardSilder from 'react-native-cards-slider'
import { ImageBackground } from '@shoutem/ui'
import styles from './styles'
export default class HomeOverlay extends React.Component {
  renderSlider() {
    return (
      <CardSilder
        autoplay
        interval={3000}
        showsHorizontalScrollIndicator
        style={{ /* borderColor: 'green', borderWidth: 1, */ width: '100%', padding: 0 }}
      >
        <View style={styles.informationCard}>
          <Text style={{ color: 'green', fontSize: 24, fontWeight: 'bold' }}>uno</Text>
        </View>
        <View style={styles.informationCard}>
          <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>dos</Text>
        </View>
        <View style={styles.informationCard}>
          <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>tres</Text>
        </View>
      </CardSilder>
    )
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
            {this.renderSlider()}
          </View>
        </ImageBackground>
      </View>
    )
  }
}
