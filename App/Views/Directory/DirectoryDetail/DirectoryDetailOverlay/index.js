import React from 'react'
import { View, Title, Tile, Subtitle, Overlay, NavigationBar, ImageBackground } from '@shoutem/ui'
export default class DirectoryDetailOverlay extends React.Component {
  render() {
    return (
      <View>
        <ImageBackground
          styleName='large-banner'
          source={{ uri: 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg' }}
        >
          <Tile>
            <Overlay styleName='image-overlay'>
              <Title styleName='sm-gutter-horizontal'>ALCALDIA</Title>
              <Subtitle>1900 Warner Ave. Unit A Santa Ana, CA</Subtitle>
            </Overlay>
          </Tile>
        </ImageBackground>
      </View>
    )
  }
}
