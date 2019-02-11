import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from '../../helpers/date/moment'
import SubHeader from './../../components/SubHeader'
import PropTypes from 'prop-types'
import SectionDivider from '../../components/SectionDivider'
import Calendar from './Calendar'
import Tickets from './Tickets'
import autobind from 'autobind-decorator'
import { ObjectComponent } from 'simple-react-form'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import { getMeQry } from 'queries'
import { event } from '/helpers/analytics'

@withGraphQL(getMeQry, { loading: <Loading />, errorComponent: <Error /> })
export default class CalendarScreen extends React.Component {
  static propTypes = {
    me: PropTypes.ObjectComponent,
  }
  static navigationOptions = {
    title: 'Calendario',
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
          me={this.props.me}
        />
        <SectionDivider title='' menu={menu} />

        {this.state.current === 'calendar' ? (
          <Calendar navigation={this.props.navigation} me={this.props.me} />
        ) : (
          <Tickets navigation={this.props.navigation} me={this.props.me} />
        )}
      </View>
    )
  }
}
