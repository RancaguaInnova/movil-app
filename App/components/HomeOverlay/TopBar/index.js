import React from 'react'
import { View } from 'react-native'
import { Title, Caption } from '@shoutem/ui'
import moment from 'App/helpers/date/moment'
import NotificationButton from 'App/components/NotificationButton'

export default class TopBar extends React.Component {
  render() {
    const today = moment()
      .format('dddd DD [de] MMMM[,] YYYY')
      .toUpperCase()
    return (
      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          padding: 5,
          justifyContent: 'center',
          alignItems: 'stretch',
          /* borderWidth: 1,
          borderColor: 'green', */
        }}
      >
        <View
          style={{
            /* borderColor: 'red',
            borderWidth: 1, */
            width: '80%',
          }}
        >
          <Title styleName='bold' style={{ color: 'white' }}>
            RANCAGUA
          </Title>
          <Caption style={{ color: 'white' }}>{today}</Caption>
        </View>
        <View
          style={{
            /* borderColor: 'black',
            borderWidth: 1, */
            width: '20%',
            alignItems: 'flex-end',
            paddingTop: 12,
          }}
        >
          <NotificationButton />
        </View>
      </View>
    )
  }
}
