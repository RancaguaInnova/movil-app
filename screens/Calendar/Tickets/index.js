import React from 'react'
import { ScrollView, Alert } from 'react-native'
import { View, TouchableOpacity, Row, Subtitle, Text, Divider, Caption } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import textStyles from '../../../styles/texts'
import styles from './styles'
import moment from '../../../helpers/date/moment'
import { WebBrowser } from 'expo'
import { Query } from 'react-apollo'
import autobind from 'autobind-decorator'
import { getSession } from '../../../providers/ApolloProvider'
import { ticketsQry } from '../../../queries'
import { client } from '../../../providers/ApolloProvider/client'
import Retry from '../../../providers/ApolloProvider/Retry'
import Loading from '../../../providers/ApolloProvider/Loading'

export default class Tickets extends React.Component {
  state = {
    profile: null,
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
    const profile = getSession()
    return (
      <View style={styles.container}>
        {!profile && (
          <Text styleName='h-center'>Debe iniciar sesión para visualizar sus entradas</Text>
        )}
        {profile && profile.userId && (
          <Query query={ticketsQry(profile.userId)} fetchPolicy='network-only'>
            {({ loading, error, data, refetch }) => {
              if (loading) return <Loading />
              if (error) return <Retry callback={refetch} />

              const { eventUserTicket } = data
              return (
                <ScrollView>
                  {eventUserTicket && eventUserTicket.length === 0 && profile && profile.userId ? (
                    <Text styleName='h-center'>No posee entradas vigentes</Text>
                  ) : profile ? (
                    eventUserTicket.map(ticket => this.renderTicket(ticket))
                  ) : null}
                </ScrollView>
              )
            }}
          </Query>
        )}
      </View>
    )
  }
}
