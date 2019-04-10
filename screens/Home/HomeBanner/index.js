import React from 'react'
import styles from './styles'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

/**
  ANIMATION
  - https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae
  - https://medium.com/@sgroff04/get-started-with-react-native-animations-23ffa1850f9
  - https://react-native-training.github.io/react-native-elements/docs/listitem.html
 */

class HomeBanner extends React.Component {
  static propTypes = {
    style: PropTypes.any,
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.7,
            display: 'flex',
            /* justifyContent: 'center', */
            /* alignItems: 'center', */
          }}
        >
          <ListItem
            /* leftAvatar={{ source: { uri: l.avatar_url } }} */
            title='Temperatura'
            subtitle='Tralala'
            containerStyle={{ height: '100%', backgroundColor: '#dbdbdb' }}
          />
        </View>
        <Animatable.View
          animation='fadeIn'
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
        </Animatable.View>
      </View>
    )
  }
}

HomeBanner = Animatable.createAnimatableComponent(HomeBanner)
export default HomeBanner
