import React from 'react'
import styles from './styles.js'
import { LocaleConfig } from 'react-native-calendars'
import { locales } from 'App/helpers/date/calendarLocales'
import { View, Subtitle } from '@shoutem/ui'
import CalendarAgenda from './CalendarAgenda'
import SubHeader from '/App/components/SubHeader'

LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'

export default class Calendar extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }} styleName='content'>
        <SubHeader view='calendar' title='Eventos y actividades comunales' />
        <CalendarAgenda />
      </View>
    )
  }
}
