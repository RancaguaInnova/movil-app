import React from 'react'
//import { View, Text, Button } from 'react-native'
import styles from './styles.js'
//import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import moment from 'App/helpers/date/moment'
import { resetIntroVisualization } from 'App/Root/client'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars'
import { locales } from 'App/helpers/date/calendarLocales'
import { Ionicons } from '@expo/vector-icons'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'

LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'

@withGraphQL(
  gql`
    query eventsByMonth($month: String!) {
      eventsByMonth(month: $month) {
        _id
        name
        time
        date
        externalUrl
        address
      }
    }
  `,
  {
    options: ownProps => ({
      variables: {
        month: ownProps.month,
      },
    }),
  }
)
export default class Home extends React.Component {
  static propTypes = {
    month: PropTypes.string,
    onChangeMonth: PropTypes.func,
    events: PropTypes.object,
  }

  static defaultProps = {
    events: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      events: {},
      months: {},
    }
    this.addEvents = this.addEvents.bind(this)
  }

  addEvents(ev = {}, currentMonth) {
    const events = this.state.events
    for (let day in ev) {
      events[day] = events[day] || []
      events[day] = unionWith(events[day], ev[day], isEqual)
    }

    const months = this.state.months
    months[currentMonth] = true

    // Update state
    this.setState({
      events,
      months,
    })

    return events
  }

  componentDidMount() {
    console.log('PROPS.eventsByMonth!', this.props.eventsByMonth)
    if (!this.state.months[this.props.month]) this.addEvents(this.props.events, this.props.month)
  }

  formatEvents(events) {}

  render() {
    const events = this.state.events
    return (
      <View style={{ flex: 1 }} styleName='content'>
        <Agenda
          items={events}
          loadItemsForMonth={month => {
            const mKey = moment(month.dateString, 'YYYY-MM-DD').format('YYYY-MM')
            // If month is not fetched
            if (!this.state.months[mKey]) {
              this.addEvents(this.props.events, mKey)
              this.props.onChangeMonth(mKey)
            }
          }}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            console.log('item', item)
            return <View />
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          /*  renderDay={(day, item) => {
            console.log('item day', item, ' - ', day)
            return <View />
          }} */
          onDayChange={day => {
            console.log('day changed', day)
          }}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            console.log('render renderEmptyDate!')
            return <View />
          }}
          firstDay={1}
          // specify how agenda knob should look like
          renderKnob={() => {
            return <Ionicons styleName='disclosure' name='ios-arrow-down' size={28} />
          }}
          // specify what should be rendered instead of ActivityIndicator
          /* renderEmptyData={(day, data) => {
            console.log('render empty!', day, ' - ', data)
            return <View />
          }} */
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text
          }}
          // Hide knob button. Default = false
          //hideKnob={true}
        />
      </View>
    )
  }
}
