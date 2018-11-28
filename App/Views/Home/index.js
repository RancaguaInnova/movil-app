import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'

import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { View, Divider, Caption } from '@shoutem/ui'
import HomeOverlay from 'App/components/HomeOverlay'
import NewsList from 'App/components/NewsList'
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

  renderOverlay() {
    return <HomeOverlay />
  }

  render() {
    return (
      <View styleName='content' style={{ marginTop: 23 }}>
        {this.renderOverlay()}
        <Divider styleName='section-header'>
          <Caption>Noticias</Caption>
        </Divider>
        <ScrollView style={{ height: 300 }}>
          <NewsList />
        </ScrollView>
      </View>
    )
  }
}
