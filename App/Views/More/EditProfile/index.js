import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'
import AutoForm from 'App/components/AutoForm'
import TableButton from 'App/components/TableButton'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import PropTypes from 'prop-types'

const fragment = gql`
  fragment setUserProfileFragment on User {
    _id
    name
    profile {
      firstName
      lastName
    }
  }
`

@withGraphQL(gql`
  query getMyProfile {
    me {
      ...setUserProfileFragment
    }
  }
  ${fragment}
`)
class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {}

  render() {
    return (
      <ScrollView style={styles.container}>
        <AutoForm
          mutation="setUserProfile"
          ref="form"
          doc={{userId: this.props.me._id, profile: this.props.me.profile}}
          onSuccess={() => this.props.navigation.goBack()}
          fragment={fragment}
          omit={['userId']}
        />
        <View style={styles.separation} />
        <TableButton
          loading={this.state.loading}
          onPress={() => this.refs.form.submit()}
          title="Guardar información"
        />
      </ScrollView>
    )
  }
}

Profile.navigationOptions = {
  title: 'Editar perfil',
  headerStyle
}

export default Profile
