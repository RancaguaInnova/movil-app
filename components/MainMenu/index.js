import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, Text, ListItem } from 'react-native-elements'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

// Screens
import Notifications from 'screens/Notifications'
import Contact from 'screens/Contact'
import Subscriptions from 'screens/Subscriptions'

// Redux actions
import { closeDrawer } from 'providers/StateProvider/Drawer/actions'
import { openModal } from 'providers/StateProvider/Modal/actions'
import { openWebView } from 'providers/StateProvider/WebView/actions'

import styles from './styles.js'

class MainMenu extends React.Component {
  static propTypes = {
    closeDrawer: PropTypes.func,
    session: PropTypes.object,
  }

  menuItems = [
    {
      title: 'Editar Perfil',
      icon: 'ios-contact',
      requireAuth: true,
    },
    {
      title: 'Mis Entradas',
      icon: 'ios-pricetags',
      requireAuth: true,
      onPress: () => {
        this.props.openWebView('https://tickets.smartrancagua.com')
      },
    },
    {
      title: 'Notificaciones',
      icon: 'ios-notifications-outline',
      requireAuth: true,
      onPress: () => {
        this.props.openModal(<Notifications />)
      },
    },
    {
      title: 'Suscripciones',
      icon: 'ios-checkbox-outline',
      requireAuth: true,
      onPress: () => {
        this.props.openModal(<Subscriptions />)
      },
    },
    {
      title: 'Contacto',
      icon: 'ios-chatboxes',
      requireAuth: true,
      onPress: () => {
        this.props.openModal(<Contact />)
      },
    },
    // Unnautenticated
    {
      title: 'Cerrar Sesión',
      icon: 'ios-log-out',
      requireAuth: true,
    },
    {
      title: 'Iniciar Sesión',
      icon: 'ios-log-in',
      requireAuth: false,
    },
    {
      title: 'Registrarse',
      icon: 'ios-add',
      requireAuth: false,
    },
    {
      title: 'Contacto',
      icon: 'ios-chatboxes',
      requireAuth: false,
      onPress: () => {
        this.props.openModal(<Contact />)
      },
    },
  ]

  @autobind
  openMenu(action) {
    this.props.closeDrawer()
    if (action) action()
  }

  render() {
    const auth = this.props.session && this.props.session.userId ? true : false
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.closeDrawer}>
          <Ionicons name='ios-arrow-back' size={30} color='black' style={{ padding: 10 }} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Avatar
            rounded
            size='large'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />

          {auth && <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>Nombre del usuario</Text>}
          {auth && <Text>email@usuario.com</Text>}
        </View>
        <ScrollView style={{ padding: 5, marginTop: 15 }}>
          {this.menuItems
            .filter(item => {
              return (item.requireAuth && auth) || (!item.requireAuth && !auth)
            })
            .map((item, i) => (
              <TouchableOpacity key={i} onPress={() => this.openMenu(item.onPress)}>
                <ListItem
                  title={item.title}
                  titleStyle={{ fontSize: 14 }}
                  bottomDivider={true}
                  leftIcon={<Ionicons name={item.icon} size={26} color='#c0c0c0' />}
                  rightIcon={<Ionicons name='ios-arrow-forward' size={20} color='#c0c0c0' />}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    )
  }
}

// Redux
const mapDispatchToProps = dispatch => {
  return {
    closeDrawer: () => {
      dispatch(closeDrawer())
    },
    openModal: child => {
      dispatch(openModal(child))
    },
    openWebView: url => {
      dispatch(openWebView(url))
    },
  }
}

const mapStateToProps = state => {
  const {
    auth: { session, loading },
  } = state
  return {
    session,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu)
