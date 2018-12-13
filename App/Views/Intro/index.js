import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './styles.js'
import { Ionicons } from '@expo/vector-icons'
import { Button, Title } from '@shoutem/ui'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import { LinearGradient } from 'expo'
import PropTypes from 'prop-types'
import { Video } from 'expo'

export default class Intro extends React.Component {
  static propTypes = {
    skip: PropTypes.func,
  }

  render() {
    const { width } = Dimensions.get('window')
    return (
      <View styles={{ paddingTop: 20 }}>
        <Video
          source={require('App/assets/rgua_video.mp4')}
          shouldPlay
          resizeMode='cover'
          isMuted
          isLooping
          style={{ height: '100%' }}
        />
        <LinearGradient
          colors={['black', 'transparent', 'transparent', 'transparent', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <Title
            style={{
              top: 35,
              padding: 10,
              position: 'absolute',
              color: 'white',
              fontSize: 15,
              fontWeight: '800',
            }}
          >
            Rancagua Digital
          </Title> */}
          <View style={styles.bottomBar} onPress={this.props.skip}>
            <Button
              styleName='full-width'
              style={{ backgroundColor: 'rgba(246,142,68,0.5)', height: '100%' }}
              onPress={this.props.skip}
            >
              <Text style={{ color: 'white', fontSize: 25 }}> ENTRAR </Text>
              <Ionicons
                name='ios-arrow-forward'
                size={25}
                style={{ color: 'white', paddingLeft: 15 }}
              />
            </Button>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
