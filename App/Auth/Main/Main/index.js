import React from 'react'
import {View, Image} from 'react-native'
import styles from './styles.js'
import Logo from 'App/components/Logo'
import Button from 'App/components/Button'
import PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func
  }

  state = {}

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Logo />
            <Button
              onPress={() => this.props.open('password')}
              disabled={!!this.state.loading}
              title="Entrar"
            />
          </View>
        </View>
      </View>
    )
  }
}
