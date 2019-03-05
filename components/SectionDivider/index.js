import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  Divider,
  Caption,
  Overlay,
  ImageBackground,
} from '@shoutem/ui'

export default class SectionDivider extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    menu: PropTypes.array,
  }

  static defaultProps = {
    title: '',
    menu: [],
  }

  state = {
    menu: [],
    current: 0,
  }

  componentDidMount() {
    this.setState({ menu: this.props.menu })
  }

  render() {
    const title = this.props.title.toUpperCase()
    const menu = this.state.menu || []
    return (
      <View>
        {this.props.title !== '' ? (
          <Divider styleName='section-header' style={styles.divider}>
            <Caption styleName='h-center' style={styles.caption} numberOfLines={2}>
              {title}
            </Caption>
          </Divider>
        ) : null}

        {menu.length > 0 ? (
          <Divider style={styles.divider}>
            {menu.map((item, key) => (
              <View
                key={key}
                styleName='vertical'
                style={{
                  alignSelf: 'center',
                  width: `${100 / menu.length}%`,
                  padding: 5,
                  backgroundColor: this.state.current !== key ? '#6d2533' : 'transparent',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    item.action()
                    this.setState({ current: key })
                  }}
                >
                  <Text styleName='h-center' style={{ color: 'white', fontSize: 16 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </Divider>
        ) : null}
      </View>
    )
  }
}
