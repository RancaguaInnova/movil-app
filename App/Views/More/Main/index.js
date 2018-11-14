import React from 'react'
import {ScrollView, Text, View, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import Account from '../Account'
import PropTypes from 'prop-types'
import TableButton from 'App/components/TableButton'
import logout from 'App/helpers/auth/logout'
import {SafeAreaView} from 'react-navigation'

export default class More extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Cuenta',
    header: null
  }

  state = {}

  renderOptions() {
    return (
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditProfile')}
          style={[styles.option, styles.optionNonLast]}>
          <Text style={styles.optionText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChangePassword')}
          style={styles.option}>
          <Text style={styles.optionText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Cuenta</Text>
          </View>
          <Account />
          {this.renderOptions()}
          <View style={styles.separation} />
          <View style={styles.separation} />
          <TableButton title="Salir" onPress={logout} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}
