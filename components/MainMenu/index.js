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
import { parseUrl } from 'helpers/url'

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
      onPress: (user = {}) => {
        this.props.openModal(<Profile />)
      },
    },
    {
      title: 'Mis Entradas',
      icon: 'ios-pricetags',
      requireAuth: true,
      onPress: (user = {}) => {
        const url = parseUrl('https://tickets.smartrancagua.com/mytickets', {
          token: user.userToken,
        })
        console.log('url', url)
        this.props.openWebView(url)
      },
    },
    /*    {
      title: 'Notificaciones',
      icon: 'ios-notifications-outline',
      requireAuth: true,
      onPress: (user = {}) => {
        this.props.openModal(<Notifications />)
      },
    }, */
    {
      title: 'Suscripciones',
      icon: 'ios-checkbox-outline',
      requireAuth: true,
      onPress: (user = {}) => {
        this.props.openModal(<Subscriptions />)
      },
    } /*  ,
   {
      title: 'Contacto',
      icon: 'ios-chatboxes',
      requireAuth: true,
      onPress: () => {
        this.props.openModal(<Contact />)
      },
    } */,
    // Unnautenticated
    {
      title: 'Cerrar Sesión',
      icon: 'ios-log-out',
      requireAuth: true,
      onPress: (user = {}) => {
        this.props.logout(user._id)
      },
    },
    {
      title: 'Iniciar Sesión',
      icon: 'ios-log-in',
      requireAuth: false,
      onPress: (user = {}) => {
        this.props.openModal(<Auth show='login' />)
      },
    },
    {
      title: 'Registrarse',
      icon: 'ios-person-add',
      requireAuth: false,
      onPress: (user = {}) => {
        this.props.openModal(<Auth show='register' />)
      },
    },
    /* {
      title: 'Contacto',
      icon: 'ios-chatboxes',
      requireAuth: false,
      onPress: (user = {}) => {
        this.props.openModal(<Contact />)
      },
    }, */
  ]

  @autobind
  openMenu(action, user) {
    this.props.closeDrawer()
    if (action) action(user)
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
            size='xlarge'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            source={require('assets/images/icon.png')}
            activeOpacity={0.7}
          />

          {auth && (
            <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>
              {`${
                user && user.profile && user.profile.firstName
                  ? user.profile.firstName.toUpperCase()
                  : ''
              } ${
                user && user.profile && user.profile.lastName
                  ? user.profile.lastName.toUpperCase()
                  : ''
              }`}
            </Text>
          )}
          {auth && <Text>{user && user.email ? user.email : ''}</Text>}
        </View>
        <ScrollView style={{ padding: 5, marginTop: 15 }}>
          {this.menuItems
            .filter(item => {
              return (item.requireAuth && auth) || (!item.requireAuth && !auth)
            })
            .map((item, i) => (
              <TouchableOpacity key={i} onPress={() => this.openMenu(item.onPress, user)}>
                <ListItem
                  title={item.title}
                  titleStyle={{ fontSize: 14, color: '#5e5f5f' }}
                  bottomDivider={true}
                  leftIcon={<Ionicons name={item.icon} size={28} color='#5e5f5f' />}
                  rightIcon={<Ionicons name='ios-arrow-forward' size={20} color='#5e5f5f' />}
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
