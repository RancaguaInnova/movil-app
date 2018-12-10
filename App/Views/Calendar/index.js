import React from 'react'
//import { View, Text, Button } from 'react-native'
import styles from './styles.js'
import { LocaleConfig } from 'react-native-calendars'
import { locales } from 'App/helpers/date/calendarLocales'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import moment from 'App/helpers/date/moment'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import Agenda from './Agenda'
LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'

export default class Home extends React.Component {
  /* static propTypes = {
    me: PropTypes.object,
  } */

  constructor(props) {
    super(props)
    this.state = {
      month: moment().format('YYYY-MM'),
    }

    this.onChangeMonth = this.onChangeMonth.bind(this)
  }

  async onChangeMonth(mKey) {
    console.log('onChangeMonth!', mKey)
    this.setState({ month: mKey })
    /* const monthEvent = {
      '2019-01-10': [{ text: 'item 3 - any js object', id: 8 }, { text: 'any js object', id: 2 }],
      '2018-12-10': [{ text: 'item 3 - any js object', id: 1 }, { text: 'any js object', id: 3 }],
    }

    let events = this.state.events
    for (let day in monthEvent) {
      events[day] = events[day] || []
      events[day] = unionWith(events[day], monthEvent[day], isEqual)
    }
    // Update events
    this.setState({ events }) */
  }

  render() {
    return (
      <View style={{ flex: 1 }} styleName='content'>
        <View
          style={{
            minHeight: 80,
          }}
        >
          <Subtitle styleName='h-center' style={{ paddingTop: 30 }} numberOfLines={4}>
            Eventos y actividades comunales
          </Subtitle>
        </View>
        <Agenda onChangeMonth={this.onChangeMonth} month={this.state.month} />
      </View>
    )
  }
}
