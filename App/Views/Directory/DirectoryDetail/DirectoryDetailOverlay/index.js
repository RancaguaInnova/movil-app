import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Title,
  Tile,
  Text,
  Subtitle,
  Overlay,
  NavigationBar,
  ImageBackground,
} from '@shoutem/ui'

export default class DirectoryDetailOverlay extends React.Component {
  static propTypes = {
    directory: PropTypes.object,
  }

  componentDidMount() {}

  render() {
    const directory = {
      name: this.props.directory.name || '',
      imageUrl: this.props.directory.imageUrl
        ? this.props.directory.imageUrl
        : 'http://smart.rancagua.cl/wp-content/uploads/2018/09/Logo-Desarrollo-Innovaci%C3%B3n-Rancagua-web.png',
    }
    return (
      <View>
        <ImageBackground styleName='large-banner' source={{ uri: directory.imageUrl }}>
          <Tile>
            <Overlay styleName='image-overlay'>
              <Title styleName='sm-gutter-horizontal'>{directory.name}</Title>
              <Subtitle>{directory.address}</Subtitle>
              <Text numberOfLines={2}>{directory.businessHours} </Text>
            </Overlay>
          </Tile>
        </ImageBackground>
      </View>
    )
  }
}
