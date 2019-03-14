import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, Text, ListItem } from 'react-native-elements'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
// Screens
import Auth from 'screens/Auth'
import Notifications from 'screens/Notifications'
import Contact from 'screens/Contact'
import Subscriptions from 'screens/Subscriptions'
import Profile from 'screens/Profile'

// Redux actions
import { closeDrawer } from 'providers/StateProvider/Drawer/actions'
import { openModal } from 'providers/StateProvider/Modal/actions'
import { openWebView } from 'providers/StateProvider/WebView/actions'
import { logout } from 'providers/StateProvider/Auth/actions'

import styles from './styles.js'
import { sessionError } from '../../providers/StateProvider/Auth/actions/session'

class MainMenu extends React.Component {
  static propTypes = {
    closeDrawer: PropTypes.func,
    openWebView: PropTypes.func,
    openModal: PropTypes.func,
    logout: PropTypes.func,
    session: PropTypes.object,
  }

  menuItems = [
    {
      title: 'Editar Perfil',
      icon: 'ios-contact',
      requireAuth: true,
      onPress: () => {
        this.props.openModal(<Profile />)
      },
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
      onPress: () => {
        this.props.logout(this.props.session._id)
      },
    },
    {
      title: 'Iniciar Sesión',
      icon: 'ios-log-in',
      requireAuth: false,
      onPress: () => {
        this.props.openModal(<Auth show='login' />)
      },
    },
    {
      title: 'Registrarse',
      icon: 'ios-person-add',
      requireAuth: false,
      onPress: () => {
        this.props.openModal(<Auth show='register' />)
      },
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
    const { user } = this.props.session

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.closeDrawer}>
          <Ionicons name='ios-arrow-back' size={30} color='#969696' style={{ padding: 10 }} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Avatar
            rounded
            size='large'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />

          {auth && (
            <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>
              {`${user.profile.firstName ? user.profile.firstName.toUpperCase() : ''} ${
                user.profile.lastName ? user.profile.lastName.toUpperCase() : ''
              }`}
            </Text>
          )}
          {auth && <Text>{user.email}</Text>}
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
                  leftIcon={<Ionicons name={item.icon} size={26} color='#ff1248' />}
                  rightIcon={<Ionicons name='ios-arrow-forward' size={20} color='#ff1248' />}
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
    logout: sessionId => {
      dispatch(logout(sessionId))
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
