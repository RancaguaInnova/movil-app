import React from 'react'
//import { View, Text, Button } from 'react-native'
import styles from './styles.js'
//import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { resetIntroVisualization } from 'App/Root/client'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
export default class Home extends React.Component {
  /* static propTypes = {
    me: PropTypes.object,
  } */

  async showIntro() {
    console.log('Show!')
    await resetIntroVisualization()
  }

  render() {
    return (
      <View style={{ flex: 1 }} styleName='content'>
        <View
          style={{
            minHeight: 80,
          }}
        >
          <Subtitle styleName='h-center' style={{ paddingTop: 30 }} numberOfLines={4}>
            Eventos y actividades comunales
          </Subtitle>
        </View>
        <Agenda
          items={{
            '2018-12-12': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
          }}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            console.log('item', item)
            return <View />
          }}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={(day, item) => {
            console.log('day', day)
            return <View />
          }}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            console.log('render renderEmptyDate!')
            return <View />
          }}
          // specify how agenda knob should look like
          renderKnob={() => {
            return <Ionicons styleName='disclosure' name='ios-arrow-down' size={28} />
          }}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            console.log('render empty!')
            return <View />
          }}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text
          }}
          // Hide knob button. Default = false
          //hideKnob={true}
        />
      </View>
    )
  }
}
