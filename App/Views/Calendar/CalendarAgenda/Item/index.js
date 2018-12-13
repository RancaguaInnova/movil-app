import React from 'react'
import textStyles from '/App/styles/texts'
import PropTypes from 'prop-types'
import { Constants, WebBrowser } from 'expo'
import { View, Subtitle, Text, Row, Divider, TouchableOpacity, Caption } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'

export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    firstItemInDay: PropTypes.bool,
  }

  onClickItem = async item => {
    try {
      if (item.externalUrl && item.externalUrl.trim() !== '') {
        let result = await WebBrowser.openBrowserAsync(item.externalUrl)
        this.setState({ result })
      }
    } catch (error) {
      console.log('Error handling onClickItem', error)
      this.setState({ result: null })
    }
  }

  render() {
    const item = this.props.item || {}
    return (
      <View
        style={{
          flex: 1,
          /* borderWidth: 1,
          borderColor: 'black', */
        }}
      >
        <Divider styleName='section-header'>
          <Caption>{item.time} HRS.</Caption>
        </Divider>
        <TouchableOpacity
          onPress={() => this.onClickItem(item)}
          style={{ flex: 1, flexDirection: 'column' /* borderWidth: 1, borderColor: 'red' */ }}
        >
          <Row styleName='small' style={{ flex: 1 /* borderWidth: 1, borderColor: 'blue'  */ }}>
            <View styleName='vertical'>
              <Subtitle numberOfLines={2} style={textStyles.rowSubtitle}>
                {item.name}
              </Subtitle>
              {item.address ? (
                <Text numberOfLines={3} style={textStyles.rowText}>
                  {`${item.address.streetName} ${item.address.streetNumber}, ${item.address.city}`}
                </Text>
              ) : (
                <Text />
              )}
            </View>
            {item.externalUrl && item.externalUrl.trim() !== '' ? (
              <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
            ) : (
              <Text />
            )}
          </Row>
        </TouchableOpacity>
      </View>
    )
  }
}
