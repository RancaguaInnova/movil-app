import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { pageHit, screenHit } from '/helpers/analytics'
import { View, Divider, Caption, Text, Icon } from '@shoutem/ui'
import styles from './styles'
import HomeOverlay from './HomeOverlay'
import HomeBanner from './HomeBanner'
import NewsList from './NewsList'
import moment from 'helpers/date/moment'
import SectionDivider from 'components/SectionDivider'
import CustomHeader from 'components/CustomHeader'
import Loading from 'components/Loading'
const pageName = 'Home'
export default class Home extends React.Component {
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
