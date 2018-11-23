import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, View, Row, Subtitle, Caption, TouchableOpacity } from '@shoutem/ui'
export default class NewsListItem extends React.Component {
  static defaultProps = {
    image: 'white',
    title: 'sdadasd',
    subTitle: 'dadadsas',
    date: 'dasdasd',
    link: '',
  }

  render() {
    return (
      <TouchableOpacity>
        <Row>
          <Image
            styleName='small rounded-corners'
            source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-2.png' }}
          />
          <View styleName='vertical stretch space-between'>
            <Subtitle>Fact Check: Wisconsin Music, Film & Photography Debate</Subtitle>
            <Caption>20 hours ago</Caption>
          </View>
        </Row>
      </TouchableOpacity>
    )
  }
}
