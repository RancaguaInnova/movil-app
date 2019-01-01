import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from '../../helpers/date/moment'
import { getMeQry } from '../../queries'
import { getSession, removeSession } from '../../providers/ApolloProvider'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import Login from './Login'
import Profile from './Profile'
import autobind from 'autobind-decorator'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  }
  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
    }),
  }

  state = {
    profile: null,
  }

  componentDidMount() {
    console.log('getSession()', getSession())
    this.setState({ profile: getSession() })
  }

  @autobind
  onLoginSuccess(session) {
    this.setState({ profile: session })
  }

  @autobind
  onLogout() {
    this.setState({ profile: null })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.profile ? (
          <Profile data={this.state.profile} onLogout={this.onLogout} />
        ) : (
          <Login onLoginSuccess={this.onLoginSuccess} />
        )}
      </View>
    )
  }
}

export default graphql(getMeQry)(ProfileScreen)
