import React from 'react'
import  './styles.js'
import PropTypes from 'prop-types'

import {

  Text,
  Divider,
  Tooltip,
} from '@ui-kitten/components';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});

export default class SectionDivider extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    menu: PropTypes.array,
    modal: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    menu: [],
  }

  animation = {
    in: 'fadeInRight',
    out: '',
  }

  state = {
    animation: this.animation.in,
    menu: [],
    timer: [],
    current: 0,
  }

  componentDidMount() {
    const state = this.state
    state.menu = this.props.menu
    state.timer = this.state.timer || []
    this.setState(state)
  }



  render() {
    const title = this.props.title.toUpperCase()
    const menu = this.state.menu || []
    return (
      <View>

        {this.props.title !== '' ? (
          <Divider styleName='section-header' style={styles.divider}>
            <Text styleName='h-center' style={styles.caption} numberOfLines={2}>
              {title}
            </Text>

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
                  <Text styleName='h-center' style={{ color: 'white', fontSize: 14 }}>
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
