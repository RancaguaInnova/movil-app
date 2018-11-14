import React from 'react'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Text } from '@shoutem/ui'
import { View } from 'react-native'
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
    me: PropTypes.object,
  }

  render() {
    return (
      <View styles={styles.container}>
        <Text>{this.props.me.email}, Welcome to Orionjs app</Text>
        <LightButton onPress={() => logout()} title='Logout' />
      </View>
    )
  }
}
