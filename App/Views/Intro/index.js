import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './styles.js'
import { Ionicons } from '@expo/vector-icons'
import { Button } from '@shoutem/ui'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Video } from 'expo'

export default class Intro extends React.Component {
  static propTypes = {
    skip: PropTypes.func,
  }

  render() {
    const { width } = Dimensions.get('window')
    return (
      <View styles={{ paddingTop: 30 }}>
        <Video
          source={require('App/assets/rgua_video.mp4')}
          shouldPlay
          resizeMode='cover'
          isMuted
          isLooping
          style={{ width, height: '100%' }}
        />
        <View style={styles.bottomBar} onPress={this.props.skip}>
          <Button
            styleName='full-width'
            style={{ backgroundColor: '#F37021', height: '100%' }}
            onPress={this.props.skip}
          >
            <Text style={{ color: 'white', fontSize: 30 }}> INGRESAR </Text>
            <Ionicons name='ios-arrow-dropright' size={30} style={{ color: 'white' }} />
          </Button>
        </View>
      </View>
    )
  }
}
