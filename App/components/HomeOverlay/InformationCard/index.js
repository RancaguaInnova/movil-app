import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Subtitle, Title } from '@shoutem/ui'

export default class InformationCard extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          /* borderWidth: 1,
          borderColor: 'red', */
        }}
      >
        <View
          style={{
            width: '40%',
            height: '100%',
            /* justifyContent: 'center', */
            alignItems: 'stretch',
            padding: 0,
            /* borderColor: 'blue',
            borderWidth: 1, */
          }}
        >
          <Ionicons
            name='ios-sunny'
            size={55}
            style={{ color: 'yellow', /* borderWidth: 1, borderColor: 'green', */ paddingLeft: 37 }}
          />
          <Title
            styleName='bold h-center'
            style={{
              color: 'white',
              fontSize: 28,
              paddingTop: 15,
              /* borderWidth: 1,
              borderColor: 'yellow', */
            }}
          >
            9
          </Title>
        </View>
        <View style={{ width: '60%', paddingTop: 10 }}>
          <Title styleName='bold' style={{ color: 'white' }}>
            Radiación UV
          </Title>
          <Subtitle multiline={3}>No salga a la calle</Subtitle>
        </View>
      </View>
    )
  }
}
