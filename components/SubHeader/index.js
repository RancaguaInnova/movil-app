import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Tile, Subtitle, Overlay, ImageBackground } from '@shoutem/ui'

export default class SubHeader extends React.Component {
  static propTypes = {
    view: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }

  static defaultProps = {
    view: 'apps',
    title: '',
  }

  render() {
    const view = this.props.view
    const imageUrl = this.props.imageUrl
    const img =
      imageUrl && imageUrl.trim() !== ''
        ? { uri: imageUrl }
        : view === 'calendar'
        ? require('../../assets/images/views/calendar.png')
        : view === 'apps'
        ? require('../../assets/images/views/apps.png')
        : view === 'muni'
        ? require('../../assets/images/views/muni.jpg')
        : require('../../assets/images/views/directory.png')

    return (
      <View>
        <ImageBackground styleName='large-banner' source={img} style={styles.image}>
          <Tile style={styles.tile}>
            <Overlay styleName='image-overlay'>
              <Subtitle numberOfLines={2} style={styles.subTitle}>
                {this.props.title}
              </Subtitle>
            </Overlay>
          </Tile>
        </ImageBackground>
      </View>
    )
  }
}
