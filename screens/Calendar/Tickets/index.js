import React from 'react'
import { ScrollView, Alert } from 'react-native'
import { View, TouchableOpacity, Row, Subtitle, Text, Divider, Caption } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import textStyles from '../../../styles/texts'
import styles from './styles'
import moment from '../../../helpers/date/moment'
import { WebBrowser } from 'expo'
import autobind from 'autobind-decorator'
import { getSession } from '../../../providers/ApolloProvider'
import { ticketsQry } from '../../../queries'
import { client } from '../../../providers/ApolloProvider/client'
import Retry from '../../../providers/ApolloProvider/Retry'
import Loading from '../../../providers/ApolloProvider/Loading'

export default class Tickets extends React.Component {
  state = {
    profile: null,
    tickets: {
      list: [],
      status: 'loading',
    },
  }

  componentDidMount() {
    const profile = getSession()
    if (profile) {
      this.loadTickets(profile)
    } else {
      this.setState({ profile: null, tickets: { status: '' } })
    }
  }

  @autobind
  async loadTickets(profile) {
    try {
      const result = await client.query({
        query: ticketsQry(profile.userId),
      })

      const {
        data: { eventUserTicket },
      } = result
      const tickets = this.state.tickets
      tickets.list = eventUserTicket
      tickets.status = ''
      this.setState({
        profile,
        tickets,
      })
    } catch (error) {
      console.log('error loadingTickets', error)
      const tickets = this.state.tickets
      tickets.list = []
      tickets.status = 'error'
      this.setState({
        profile,
        tickets,
      })
    }
  }

  onClickTicket = async ticket => {
    try {
      if (ticket.externalUrl && ticket.externalUrl.trim() !== '') {
        let url =
          ticket.externalUrl.indexOf('?') !== -1
            ? `${ticket.externalUrl}&`
            : `${ticket.externalUrl}?`
        url += `ticket=${ticket._id}`
        let result = await WebBrowser.openBrowserAsync(url)
        this.setState({ result })
      }
    } catch (error) {
      console.log('Error handling onClickItem', error)
      this.setState({ result: null })
    }
  }

  renderTicket(ticket) {
    const address = ticket.event && ticket.event.address ? ticket.event.address : {}
    const srtAddress = `${address.streetName || ''} ${address.streetNumber || ''}, ${address.city ||
      ''}`
    return (
      <TouchableOpacity key={ticket._id} onPress={() => this.onClickTicket(ticket)}>
        <Row styleName='small'>
          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{ticket.event.name}</Subtitle>
            <Text numberOfLines={2} style={textStyles.rowText}>
              {srtAddress}
            </Text>
            <Caption style={textStyles.rowCaption}>{ticket.event.date}</Caption>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tickets.status === 'loading' ? (
          <Loading />
        ) : this.state.tickets.status === 'error' ? (
          <Retry callback={() => this.loadTickets(this.state.profile)} />
        ) : (
          <ScrollView>
            {!this.state.profile && (
              <Text styleName='h-center'>Debe iniciar sesión para visualizar sus entradas</Text>
            )}

            {this.state.tickets && this.state.tickets.list.length === 0 && this.state.profile ? (
              <Text styleName='h-center'>No posee entradas vigentes</Text>
            ) : this.state.profile ? (
              this.state.tickets.list.map(ticket => this.renderTicket(ticket))
            ) : null}
          </ScrollView>
        )}
      </View>
    )
  }
}
