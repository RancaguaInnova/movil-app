import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Modal, View, Button } from 'react-native'
import { Text, TouchableOpacity, NavigationBar, Title } from '@shoutem/ui'
import { event } from '/helpers/analytics'

export default class WebViewFooter extends React.Component {
  static propTypes = {
    goBack: PropTypes.func,
    title: PropTypes.string,
    color: PropTypes.string,
  }

  static defaultProps = {
    goBack: () => {},
    title: 'Volver',
    color: 'white',
  }
  render() {
    return (
      <View style={styles.footerContainer}>
        {/* <Ionicons styleName='disclosure' name='ios-arrow-back' color='white' size={28} />
        <Text>Volver</Text> */}
        <Button
          color={this.props.color}
          title={this.props.title}
          onPress={() => {
            this.props.goBack()
          }}
        />
      </View>
    )
  }
}
