import React from 'react'
import styles from './styles.js'
import gql from 'graphql-tag'
import moment from 'App/helpers/date/moment'
import { Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars'
import { locales } from 'App/helpers/date/calendarLocales'
import { Ionicons } from '@expo/vector-icons'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import { client } from 'App/Root/client'
import { View } from '@shoutem/ui'
import autobind from 'autobind-decorator'
import Item from './Item'
//import Day from './day'
import EmptyDate from './emptyDate'

LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'

export default class CalendarAgenda extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: {},
      months: {},
    }
  }

  @autobind
  addEvents(ev = {}, mKey) {
    const events = this.state.events
    for (let day in ev) {
      events[day] = events[day] || []
      events[day] = unionWith(events[day], ev[day], isEqual)
    }

    const months = this.state.months
    months[mKey] = true

    this.setState({
      events,
      months,
    })
  }

  @autobind
  async loadItemsForMonth(month) {
    try {
      const mKey = moment(month.dateString, 'YYYY-MM-DD').format('YYYY-MM')
      if (!this.state.months[mKey]) {
        const eventsByMonthQry = gql`
        {
          eventsByMonth(month: "${mKey}") {
            _id
            name
            time
            date
            externalUrl
            address
          }
        }
        `
        let events = await client.query({
          query: eventsByMonthQry,
        })

        this.addEvents(this.formatEvents(events), mKey)
      }
    } catch (error) {
      console.log('[loadItemsForMonth]:', error)
    }
  }

  formatEvents(events) {
    const {
      data: { eventsByMonth },
    } = events
    const eventFormated = {}
    eventsByMonth.map(ev => {
      const dKey = moment(ev.date).format('YYYY-MM-DD')
      eventFormated[dKey] = eventFormated[dKey] || []
      eventFormated[dKey].push(ev)
    })
    return eventFormated
  }

  render() {
    const events = this.state.events
    return (
      <View styleName='content' style={{ flex: 1 }}>
        <Agenda
          items={events}
          loadItemsForMonth={this.loadItemsForMonth}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return <Item item={item} firstItemInDay={firstItemInDay} />
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => <View />}
          firstDay={1}
          futureScrollRange={300}
          pastScrollRange={300}
          renderKnob={() => <Ionicons styleName='disclosure' name='ios-arrow-down' size={28} />}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={(day, data) => <EmptyDate />}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text
          }}
        />
      </View>
    )
  }
}
