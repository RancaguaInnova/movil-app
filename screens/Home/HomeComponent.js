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
const pageName = 'home'
import Loading from 'components/Loading'

export default class Home extends React.Component {
  static propTypes = {
    requestSession: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  static navigationOptions = {
    header: null,
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
        <HomeOverlay navigation={this.props.navigation} />
        <SectionDivider title={title} />
        <ScrollView style={styles.container}>
          <NewsList />
        </ScrollView>
      </View>
    )
  }
}
