import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Tile, Subtitle, Overlay, ImageBackground } from '@shoutem/ui'
export default class SubHeader extends React.Component {
  static propTypes = {
    view: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    view: 'apps',
    title: '',
  }

  render() {
    const view = this.props.view
    const img =
      view === 'calendar'
        ? require('App/assets/views/calendar.png')
        : view === 'apps'
        ? require('App/assets/views/apps.png')
        : require('App/assets/views/directory.png')

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
