import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from 'helpers/date/moment'
import PropTypes from 'prop-types'
import Login from './Login'
import Profile from './Profile'
import autobind from 'autobind-decorator'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  }

  static propTypes = {
    getSession: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  // componentDidMount() {
  //   this.props.getSession()
  // }

  @autobind
  onLogout() {
    this.setState({ profile: null })
  }

  render() {
    console.log('this.props.session:', this.props.session)
    return (
      <View style={styles.container}>
        {this.props.session ? (
          <Profile data={this.props.session.user.profile} onLogout={this.onLogout} />
        ) : (
          <Login />
        )}
      </View>
    )
  }
}
