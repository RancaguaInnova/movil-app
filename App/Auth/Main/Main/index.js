import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import styles from './styles.js'
import Logo from 'App/components/Logo'
/* import Button from 'App/components/Button' */
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import { Video } from 'expo'
import { Button } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func,
  }

  state = {}

  videoError(error) {
    console.log('error', error)
  }

  onBuffer() {
    console.log('video on buffer!')
  }

  render() {
    const { width } = Dimensions.get('window')
    return (
      <View style={{ flex: 1, paddingTop: 24 }}>
        <Video
          source={require('/App/assets/rgua_video.mp4')}
          resizeMode='cover'
          isMuted={true}
          isLooping={true}
          onError={this.videoError}
          style={{ height: '100%' }}
          shouldPlay
        />
        <View style={styles.controlBar}>
          <View style={{ bottom: 0, position: 'absolute', width }}>
            <Button
              styleName='full-width'
              style={{ backgroundColor: '#F37021' }}
              onPress={() => this.props.open('password')}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>INGRESAR</Text>
              <Ionicons
                name='ios-arrow-dropright'
                style={{ paddingLeft: 10 }}
                color='white'
                size={25}
              />
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
