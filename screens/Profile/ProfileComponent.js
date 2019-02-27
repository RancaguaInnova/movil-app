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
    requestSession: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  state = {
    session: null
  }

  async componentDidMount() {
    try {
      const session = await this.props.requestSession()
      this.setState({ session })
    } catch(error) {
      console.log('Error getting session:', error)
    }
  }

  @autobind
  onLogout() {
    this.setState({ profile: null })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.session || this.state.session ? (
          <Profile profile={this.props.session.user.profile} onLogout={this.onLogout} />
        ) : (
          <Login />
        )}
      </View>
    )
  }
}
