import React from 'react'
import { Text } from 'react-native'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { Row, Image, Subtitle, Divider, TouchableOpacity, View, Caption } from '@shoutem/ui'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      email
    }
  }
`)
export default class Directory extends React.Component {
  static propTypes = {
    me: PropTypes.object,
  }

  renderItem() {
    return (
      <TouchableOpacity>
        <Row styleName='small'>
          <Image
            styleName='small-avatar'
            source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
          />

          <View styleName='vertical'>
            <Subtitle>Encargado</Subtitle>
            <Text numberOfLines={2}>+56 9 11111111</Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-call' size={28} color='green' />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View styleName='content'>
        <Divider styleName='section-header'>
          <Caption>Municipio</Caption>
        </Divider>
        {this.renderItem()}
        {this.renderItem()}

        <Divider styleName='section-header'>
          <Caption>Deporte</Caption>
        </Divider>
        {this.renderItem()}
        <Divider styleName='section-header'>
          <Caption>Tránsito</Caption>
        </Divider>
        {this.renderItem()}
        {this.renderItem()}
      </View>
    )
  }
}
