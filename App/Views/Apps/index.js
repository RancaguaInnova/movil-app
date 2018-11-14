import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      profile {
        identifier
      }
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
        <Text style={styles.text}>{this.props.me.email}, welcome to Orionjs app</Text>
      </View>
    )
  }
}
