import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles.js'
//import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { resetIntroVisualization } from 'App/Root/client'
export default class Home extends React.Component {
  /* static propTypes = {
    me: PropTypes.object,
  } */

  async showIntro() {
    console.log('Show!')
    await resetIntroVisualization()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Calendario ;)</Text>
        <Button
          onPress={() => {
            this.showIntro()
          }}
          title='show Intro'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    )
  }
}
