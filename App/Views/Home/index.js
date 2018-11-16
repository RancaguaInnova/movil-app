import React from 'react'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { Text, View, Divider, Caption } from '@shoutem/ui'
import HomeOverlay from 'App/components/HomeOverlay'
import NewsListItem from 'App/components/NewsListItem'
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

  renderNews() {
    return (
      <View>
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
        <NewsListItem />
      </View>
    )
  }

  render() {
    return (
      <View styleName='content' style={{ marginTop: 23 }}>
        {this.renderOverlay()}
        <Divider styleName='section-header'>
          <Caption>Noticias</Caption>
        </Divider>
        <ScrollView style={{ height: 320 }}>{this.renderNews()}</ScrollView>
      </View>
    )
  }
}
