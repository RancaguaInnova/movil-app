import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
import moment from '../../helpers/date/moment'
import { getMeQry } from '../../queries'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import Login from './Login'
import Profile from './Profile'

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
    this.setState({ profile: this.props.data.me })
  }

  onLoginSuccess() {}

  render() {
    console.log('me', this.state.profile)
    return (
      <View style={styles.container}>
        {this.state.profile ? <Profile /> : <Login onLoginSuccess={this.onLoginSuccess} />}
      </View>
    )
  }
}

export default graphql(getMeQry)(ProfileScreen)
