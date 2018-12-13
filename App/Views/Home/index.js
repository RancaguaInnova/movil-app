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
      <View styleName='content' style={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ paddingTop: 25, backgroundColor: '#4fb2e3' }}>{this.renderOverlay()}</View>
        <Divider styleName='section-header' style={{ paddingTop: 0 }}>
          <Caption>Noticias</Caption>
        </Divider>
        <ScrollView>
          <NewsList />
        </ScrollView>
      </View>
    )
  }
}
