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
        : 'https://img2.eltipografo.cl/media/2017/12/Plaza-1-1024x642.jpg',
    }
    return (
      <View>
        <ImageBackground
          styleName='large-banner'
          source={{ uri: directory.imageUrl }}
          style={{ height: 180 }}
        >
          <Tile>
            <Overlay styleName='image-overlay'>
              <Title styleName='sm-gutter-horizontal' numberOfLines={2}>
                {directory.name}
              </Title>
              <Subtitle style={{ fontSize: 14 }}>{directory.address}</Subtitle>
              <Text numberOfLines={2} style={{ fontSize: 12 }}>
                {directory.businessHours}{' '}
              </Text>
            </Overlay>
          </Tile>
        </ImageBackground>
      </View>
    )
  }
}
