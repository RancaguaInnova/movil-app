import React from 'react'
import { ScrollView } from 'react-native'
import { View, Divider, Caption, Text, Icon } from '@shoutem/ui'
import styles from './styles'
import HomeOverlay from './HomeOverlay'
import NewsList from './NewsList'
import moment from '../../helpers/date/moment'
import SectionDivider from '../../components/SectionDivider'

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
    /* title: `RANCAGUA, ${moment()
      .format('DD [DE] MMMM[, DE ] YYYY')
      .toUpperCase()}`, */
    /* headerStyle: {
      backgroundColor: '#4fb2e3',
    },
    headerTitleStyle: {
      fontSize: 14,
      color: 'white',
    }, */
  }

  render() {
    const title = `RANCAGUA, ${moment()
      .format('DD [DE] MMMM[, DE ] YYYY')
      .toUpperCase()}`
    return (
      <View style={styles.mainContainer}>
        <HomeOverlay />
        <SectionDivider title={title} />
        <ScrollView style={styles.container}>
          <NewsList />
        </ScrollView>
      </View>
    )
  }
}
