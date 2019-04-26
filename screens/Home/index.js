import React from 'react'
import PropTypes from 'prop-types'
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
import HomeBanner from './HomeBanner'
import CustomHeader from 'components/CustomHeader'
import Loading from 'components/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { getMeQry } from 'providers/ApolloProvider/queries'
import { connect } from 'react-redux'
import { requestSession } from 'providers/StateProvider/Auth/actions'
import { Permissions, Notifications } from 'expo'

const pageName = 'Home'

class Home extends React.Component {
  static propTypes = {
    requestSession: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  static navigationOptions = {
    header: <CustomHeader type='main' />,
  }

  async componentDidMount() {
    this.props.requestSession()
    this.registerForPushNotificationsAsync()
  }

  async registerForPushNotificationsAsync() {
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') return

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync()
      let userId = this.props.userId
      // Call the GraphQL API to save the users device push token.
      await this.props.registerDevice({ userId, token })
    } catch (error) {
      console.log('Error registering device token:', error)
    }
  }

  render() {
    pageHit(pageName)
    const title = `RANCAGUA, ${moment()
      .format('DD MMMM [DE] YYYY')
      .toUpperCase()}`
    if (this.props.loading) return <Loading />
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        {/* <SectionDivider title={title} /> */}
        <HomeBanner />
        {/* <HomeOverlay navigation={this.props.navigation} /> */}
        <ScrollView style={styles.container}>
          <NewsList />
        </ScrollView>
      </View>
    )
  }
}

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
