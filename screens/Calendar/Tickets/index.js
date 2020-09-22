import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider, Icon, ListItem, Text } from '@ui-kitten/components'
import { Ionicons } from '@expo/vector-icons'
import { Query } from 'react-apollo'
import './styles'
import { event, pageHit } from '/helpers/analytics'
import { parseUrl } from '/helpers/url'
import { ticketsQry } from 'providers/ApolloProvider/queries'
import Retry from 'providers/ApolloProvider/Retry'
import Loading from 'providers/ApolloProvider/Loading'
import { openWebView } from 'providers/StateProvider/WebView/actions'

const pageName = 'calendar/tickets'
const styles = StyleSheet.create( {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
} )

class Tickets extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
  }

  onClickTicket = async ticket => {
    try {
      if (ticket.externalUrl && ticket.externalUrl.trim() !== '') {
        let url = parseUrl( ticket.externalUrl, { ticket: ticket._id } )
        this.props.openWebView( url )
        event( 'click_ticket', url )
      }
    } catch (error) {
      console.log( 'Error handling onClickItem', error )
      this.setState( { result: null } )
    }
  }

  renderTicket(ticket) {
    const address = ticket.event && ticket.event.address ? ticket.event.address : {}
    const srtAddress = `${address.streetName || ''} ${address.streetNumber || ''}, ${address.city ||
    ''}`
    return (
      <TouchableOpacity key={ticket._id} onPress={() => this.onClickTicket( ticket )}>
        {/* <View style={styles.row}>
          <View styleName='vertical'>
            <Text style={textStyles.rowSubtitle}>{ticket.event.name}</Text>
            <Text numberOfLines={2} style={textStyles.rowText}>
              {srtAddress}
            </Text>
            <Text style={textStyles.rowCaption} >{ticket.event.date}</Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </View>
        <Divider styleName='line' />
        */}
        <ListItem
          title={ticket.event.name}
          description={evaProps => (
            <View styleName='vertical'>
              <Text  {...evaProps}>{ticket.event.name}</Text>
              <Text  {...evaProps}>
                {srtAddress}
              </Text>
              <Text  {...evaProps} >{ticket.event.date}</Text>
            </View>
          )
          }
          accessoryLeft={() => <Icon
            style={styles.icon}
            fill='#FE0747'
            name='browser-outline'
          />}
          ItemSeparatorComponent={Divider}
          accessoryRight={() => <Ionicons styleName="disclosure" name="ios-arrow-forward"
                                          size={28} />}
        />
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    pageHit( pageName )
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit( pageName )} />
        {!this.props.userId ? (
          <Text styleName='h-center'>Debe iniciar sesión para visualizar sus entradas</Text>
        ) : null}
        {this.props.userId ? (
          <Query
            query={ticketsQry( this.props.userId )}
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
                    eventUserTicket.map( ticket => this.renderTicket( ticket ) )
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
      dispatch( openWebView( url ) )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( Tickets )
