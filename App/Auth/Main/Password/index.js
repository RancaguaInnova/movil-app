import React from 'react'
import {View, ScrollView, StatusBar} from 'react-native'
import styles from './styles.js'
import Swiper from 'react-native-swiper'
import Login from './Login'
import Forgot from './Forgot'
import autobind from 'autobind-decorator'
import IconButton from 'App/components/IconButton'
import PropTypes from 'prop-types'
import Register from './Register'

export default class Password extends React.Component {
  static propTypes = {
    open: PropTypes.func
  }

  state = {index: 1}

  @autobind
  open(index) {
    this.refs.swiper.scrollBy(index - this.state.index)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <IconButton
          onPress={() => this.props.open(null)}
          name="close"
          size={25}
          style={styles.closeIcon}
        />
        <Swiper
          ref="swiper"
          loop={false}
          index={this.state.index}
          onIndexChanged={index => this.setState({index})}
          style={styles.wrapper}>
          <ScrollView style={styles.forgot} contentContainerStyle={styles.innerContent}>
            <Forgot open={this.open} />
          </ScrollView>
          <ScrollView style={styles.login} contentContainerStyle={styles.innerContent}>
            <Login open={this.open} />
          </ScrollView>
          <ScrollView style={styles.register} contentContainerStyle={styles.innerContent}>
            <Register open={this.open} />
          </ScrollView>
        </Swiper>
      </View>
    )
  }
}
