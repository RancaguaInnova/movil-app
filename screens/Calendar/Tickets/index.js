import React from 'react'
import { ScrollView, Alert } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Row, Subtitle, Text, Divider, Caption } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import { WebBrowser } from 'expo'
import { Query } from 'react-apollo'
import autobind from 'autobind-decorator'

import textStyles from 'styles/texts'
import styles from './styles'

import { pageHit, event } from '/helpers/analytics'
import moment from 'helpers/date/moment'
import { parseUrl } from '/helpers/url'
import { getSession } from 'providers/ApolloProvider'
import { ticketsQry } from 'providers/ApolloProvider/queries'
import { client } from 'providers/ApolloProvider/client'
import Retry from 'providers/ApolloProvider/Retry'
import Loading from 'providers/ApolloProvider/Loading'
import { openWebView } from 'providers/StateProvider/WebView/actions'

const pageName = 'calendar/tickets'

class Tickets extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
  }

  onClickTicket = async ticket => {
    try {
      if (ticket.externalUrl && ticket.externalUrl.trim() !== '') {
        let url = parseUrl(ticket.externalUrl, { ticket: ticket._id })
        this.props.openWebView(url)
        event('click_ticket', url)
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
    pageHit(pageName)
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        {!this.props.userId ? (
          <Text styleName='h-center'>Debe iniciar sesión para visualizar sus entradas</Text>
        ) : null}
        {this.props.userId ? (
          <Query
            query={ticketsQry(this.props.userId)}
            fetchPolicy='network-only'
            notifyOnNetworkStatusChange
          >
            {({ loading, error, data, refetch }) => {
              if (loading) return <Loading />
              if (error) return <Retry callback={refetch} />

              const { eventUserTicket } = data
              return (
                <ScrollView>
                  {eventUserTicket && eventUserTicket.length === 0 && this.props.userId ? (
                    <Text styleName='h-center'>No posee entradas vigentes</Text>
                  ) : profile ? (
                    eventUserTicket.map(ticket => this.renderTicket(ticket))
                  ) : null}
                </ScrollView>
              )
            }}
          </Query>
        ) : null}
      </View>
    )
  }
}

// Redux
const mapStateToProps = state => {
  const {
    auth: { session },
  } = state
  return {
    userId: session.userId || null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openWebView: url => {
      dispatch(openWebView(url))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tickets)
