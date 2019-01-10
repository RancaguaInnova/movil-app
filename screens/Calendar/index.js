import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from '../../helpers/date/moment'
import SubHeader from './../../components/SubHeader'
import SectionDivider from '../../components/SectionDivider'
import Calendar from './Calendar'
import Tickets from './Tickets'
import autobind from 'autobind-decorator'

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendario',
  }

  state = {
    current: 'calendar',
  }

  @autobind
  showCalendar() {
    this.setState({ current: 'calendar' })
  }

  @autobind
  showTickets() {
    this.setState({ current: 'tickets' })
  }

  render() {
    const menu = [
      { title: 'Calendario', action: this.showCalendar },
      { title: 'Mis Entradas', action: this.showTickets },
    ]
    return (
      <View style={styles.container}>
        <SubHeader
          view='calendar'
          title='Eventos y actividades comunales'
          navigation={this.props.navigation}
        />
        <SectionDivider title='' menu={menu} />

        {this.state.current === 'calendar' ? (
          <Calendar navigation={this.props.navigation} />
        ) : (
          <Tickets navigation={this.props.navigation} />
        )}
      </View>
    )
  }
}
