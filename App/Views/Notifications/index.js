import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      email
    }
  }
`)
export default class Home extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.me.email}, Welcome to Orionjs app</Text>
        <LightButton onPress={() => logout()} title="Logout" />
      </View>
    )
  }
}
