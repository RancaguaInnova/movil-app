import React from 'react'
import styles from './styles.js'
import { LocaleConfig } from 'react-native-calendars'
import { locales } from 'App/helpers/date/calendarLocales'
import { View, Subtitle } from '@shoutem/ui'
import Agenda from './Agenda'

LocaleConfig.locales['es'] = locales
LocaleConfig.defaultLocale = 'es'

export default class Calendar extends React.Component {
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
        <Agenda />
      </View>
    )
  }
}
