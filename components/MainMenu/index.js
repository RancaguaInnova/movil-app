import React from 'react'
import { View } from 'react-native'
import { Avatar, Text, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'

import styles from './styles.js'

export default class MainMenu extends React.Component {
  static propTypes = {}

  menuItems = [
    {
      title: 'Editar Perfil',
      icon: 'ios-contact',
    },
    {
      title: 'Mis Entradas',
      icon: 'ios-pricetags',
    },
    {
      title: 'Notificaciones',
      icon: 'ios-notifications-outline',
    },
    {
      title: 'Suscripciones',
      icon: 'ios-checkbox-outline',
    },
    {
      title: 'Contacto',
      icon: 'ios-chatboxes',
    },
    {
      title: 'Cerrar Sesión',
      icon: 'ios-log-out',
    },
  ]

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name='ios-arrow-back'
          size={30}
          color='black'
          style={{ padding: 20, position: 'absolute' }}
        />
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
          <Avatar
            rounded
            size='large'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />

          <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>Nombre del usuario</Text>
          <Text>email@usuario.com</Text>
        </View>
        <View style={{ padding: 5, marginTop: 15 }}>
          {this.menuItems.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              titleStyle={{ fontSize: 14 }}
              bottomDivider={true}
              leftIcon={<Ionicons name={item.icon} size={30} color='#969696' />}
              rightIcon={<Ionicons name='ios-arrow-forward' size={30} color='#969696' />}
            />
          ))}
        </View>
      </View>
    )
  }
}
