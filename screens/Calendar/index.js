import React from 'react'
import { View,} from 'react-native'
import styles from './styles'
import SectionDivider from '../../components/SectionDivider'
import Calendar from './Calendar'
import Tickets from './Tickets'
import autobind from 'autobind-decorator'
import CustomHeader from 'components/CustomHeader'

import { event } from '/helpers/analytics'
export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    header: <CustomHeader type='main' />,
  }

  state = {
    current: 'calendar',
  }

  @autobind
  showCalendar() {
    this.setState({ current: 'calendar' })
    event('click_calendar_tab', 'calendar')
  }

  @autobind
  showTickets() {
    this.setState({ current: 'tickets' })
    event('click_calendar_tab', 'tickets')
  }

  render() {
    /* const menu = [
      { title: 'Calendario', action: this.showCalendar },
      { title: 'Mis Entradas', action: this.showTickets },
    ] */
    return (
      <View style={styles.container}>
        <SectionDivider title='Calendario' />

        {this.state.current === 'calendar' ? (
          <Calendar />
        ) : (
          <Tickets />
        )}
      </View>
    )
  }
}
