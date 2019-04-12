import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'

export default class Notifications extends React.Component {
  static propTypes = {}

  render() {
    const list = [
      {
        title: 'Appointments',
        subtitle: 'cualquiercosa',
        color: 'red',
      },
      {
        title: 'Trips',
        subtitle: 'cualquiercosa2',
        color: 'green',
      },
    ]

    return (
      <View style={styles.container}>
        <SectionDivider title='Notificaciones' />
        <ScrollView>
          {list.map((item, i) => (
            <TouchableOpacity key={i}>
              <ListItem
                title={item.title}
                titleStyle={{ fontWeight: 'bold' }}
                subtitle={item.subtitle}
                leftIcon={
                  <Ionicons name='ios-notifications-outline' size={26} color={item.color} />
                }
                rightIcon={<Ionicons name='ios-arrow-forward' size={20} color='#c0c0c0' />}
                containerStyle={{
                  margin: 7,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: '#ebebeb',
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
