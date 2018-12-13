import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
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
    const view = this.props.view // `App/assets/views/${this.props.view}.png`
    const img =
      view === 'calendar'
        ? require('App/assets/views/calendar.png')
        : view === 'apps'
        ? require('App/assets/views/apps.png')
        : require('App/assets/views/directory.png')

    return (
      <View>
        <ImageBackground styleName='large-banner' source={img} style={{ height: 150 }}>
          <Tile style={{ padding: 0 }}>
            <Overlay styleName='image-overlay'>
              <Subtitle numberOfLines={2} style={{ fontSize: 18 }}>
                {this.props.title}
              </Subtitle>
            </Overlay>
          </Tile>
        </ImageBackground>
      </View>
    )
  }
}
