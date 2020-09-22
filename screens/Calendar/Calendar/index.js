import React from 'react'
import { ScrollView,View } from 'react-native'
import { pageHit } from '/helpers/analytics'
import { NavigationEvents } from 'react-navigation'
import styles from './styles'
import { eventsByMonth } from 'providers/ApolloProvider/queries'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import { Ionicons } from '@expo/vector-icons'
import moment from 'helpers/date/moment'
import { locales } from 'helpers/date/calendarLocales'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { client } from 'providers/ApolloProvider'
import autobind from 'autobind-decorator'
import EmptyDate from './emptyDate'
import Item from './Item'
import { event } from '/helpers/analytics'
LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'
const pageName = 'calendar'

export default class Calendar extends React.Component {
  state = {
    events: {},
    months: {},
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
        let events = await client.query({
          query: eventsByMonth(mKey),
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
    pageHit(pageName)
    const events = this.state.events
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        <Agenda
          theme={{
            dotColor: '#fe0747',
            selectedDayBackgroundColor: '#fe0747',
            todayTextColor: '#fe0747',
          }}
          items={events}
          loadItemsForMonth={this.loadItemsForMonth}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return (
              <Item
                item={item}
                firstItemInDay={firstItemInDay}
                navigation={this.props.navigation}
                me={this.props.me}
              />
            )
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => <View />}
          onCalendarToggled={calendarOpened => {
            event('click_calendar_open', calendarOpened)
          }}
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
