import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from 'helpers/date/moment'
import PropTypes from 'prop-types'
import Login from './Login'
import Profile from './Profile'
import autobind from 'autobind-decorator'
import isEmpty from 'lodash/isEmpty'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  }

  static propTypes = {
    requestSession: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  state = {
    session: {}
  }

  render() {
    const { session, loading, logout, updateProfile, error } = this.props
    if (error) console.log(error)
    return (
      <View style={styles.container}>
        {!isEmpty(session) || !isEmpty(this.state.session) ? (
          <Profile
            session={session}
            logout={logout}
            updateProfile={updateProfile}
            error={error}
            loading={loading}
          />
        ) : (
          <Login />
        )}
      </View>
    )
  }
}
