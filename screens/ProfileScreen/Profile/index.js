import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, Divider, Caption } from '@shoutem/ui'
import styles from './styles'
//import moment from '../../helpers/date/moment'
import PropTypes from 'prop-types'

export default class Profile extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      me: PropTypes.object,
    }),
  }

  componentDidMount() {
    //this.setState({ profile: this.props.data.me })
  }

  render() {
    //console.log('me', this.state.profile)
    return (
      <View style={styles.container}>
        <Text>Hola profile</Text>
      </View>
    )
  }
}
