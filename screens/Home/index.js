import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { pageHit, screenHit } from '/helpers/analytics'
import { View, Divider, Caption, Text, Icon } from '@shoutem/ui'
import styles from './styles'
import HomeOverlay from './HomeOverlay'
import NewsList from './NewsList'
import moment from '../../helpers/date/moment'
import SectionDivider from '../../components/SectionDivider'
import WebView from 'components/WebView'
import SubHeader from './../../components/SubHeader'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import { getMeQry } from 'providers/ApolloProvider/queries'
const pageName = 'home'
import { connect } from 'react-redux'
import Home from './HomeComponent'
import { requestSession } from 'providers/StateProvider/Auth/actions'

const mapDispatchToProps = dispatch => {
  return {
    requestSession: () => {
      dispatch(requestSession())
    },
  }
}

const mapStateToProps = state => {
  const {
    auth: { session, loading },
  } = state
  return {
    session,
    loading,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
