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
import CustomHeader from 'components/CustomHeader'
import Error from 'providers/ApolloProvider/ApolloError'
import { getMeQry } from 'providers/ApolloProvider/queries'
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
        {/* <SubHeader
          view='calendar'
          title='Eventos y actividades comunales'
          navigation={this.props.navigation}
        /> */}

        {this.state.current === 'calendar' ? (
          <Calendar navigation={this.props.navigation} />
        ) : (
          <Tickets navigation={this.props.navigation} />
        )}
      </View>
    )
  }
}
