import React from 'react'
import { View, Subtitle, Row, Divider, TouchableOpacity, Caption } from '@shoutem/ui'
import { Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import textStyles from 'styles/texts'
import styles from './styles'

import { openWebView } from 'providers/StateProvider/WebView/actions'
import { getSession } from 'providers/ApolloProvider'
import { getMeQry } from 'providers/ApolloProvider/queries'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'

import { parseUrl } from '/helpers/url'
import moment from 'helpers/date/moment'
import { event } from '/helpers/analytics'

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    firstItemInDay: PropTypes.bool,
    userToken: PropTypes.string,
    openWebView: PropTypes.func.isRequired,
  }

  onClickItem = async item => {
    try {
      if (item.externalUrl && item.externalUrl.trim() !== '' && this.props.userToken) {
        let url = parseUrl(item.externalUrl, { token: this.props.userToken })
        this.props.openWebView(url)
        event('click_calendar_online_event', item.externalUrl)
      } else if (item.externalUrl && item.externalUrl.trim() !== '' && !this.props.userToken) {
        Alert.alert('Debe iniciar sesión para acceder al Evento', null, [
          {
            text: 'Cancelar',
            onPress: () => {
              event('click_calendar_event_login', 'cancel')
            },
            style: 'cancel',
          },
          {
            text: 'Iniciar',
            onPress: () => {
              this.props.navigation.navigate('Profile')
              event('click_calendar_event_login', 'login')
            },
          },
        ])
        event('click_calendar_offline_event', item.externalUrl)
      }
    } catch (error) {
      console.log('Error handling onClickItem', error)
      this.setState({ result: null })
    }
  }

  render() {
    const item = this.props.item || {}
    const date = moment(item.date).format('DD-MM-YYYY')
    return (
      <View style={styles.container}>
        <Divider styleName='section-header'>
          <Caption>
            {date} / {item.time} HRS.
          </Caption>
        </Divider>
        <TouchableOpacity onPress={() => this.onClickItem(item)} style={styles.touchableRow}>
          <Row style={styles.container}>
            <View styleName='vertical' style={styles.itemContent}>
              <Subtitle
                numberOfLines={2}
                style={{ ...textStyles.rowSubtitle, ...styles.itemSubtitle }}
              >
                {item.name}
              </Subtitle>
              {item.description && (
                <Text numberOfLines={3} style={textStyles.rowText}>
                  {item.description}
                </Text>
              )}

              {item.address && (
                <Text numberOfLines={3} style={{ ...textStyles.rowText, ...styles.itemSubtitle }}>
                  {`${item.address.streetName} ${item.address.streetNumber || ''}, ${
                    item.address.city
                  }`}
                </Text>
              )}
            </View>

            {item.externalUrl && item.externalUrl.trim() !== '' && (
              <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
            )}
          </Row>
        </TouchableOpacity>
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
    userToken: session && session.user && session.user.userToken ? session.user.userToken : null,
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
)(Item)
