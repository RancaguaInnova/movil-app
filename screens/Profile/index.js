import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from 'helpers/date/moment'
import { getSession } from 'helpers/auth'
import PropTypes from 'prop-types'
import Login from './Login'
import Profile from './Profile'
import autobind from 'autobind-decorator'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  }
  static propTypes = {
    me: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
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
    console.log('this.props.profile:', this.props.profile)
    return (
      <View style={styles.container}>
        {this.props.profile ? (
          <Profile data={this.state.profile} onLogout={this.onLogout} />
        ) : (
          <Login onLoginSuccess={this.onLoginSuccess} />
        )}
      </View>
    )
  }
}
