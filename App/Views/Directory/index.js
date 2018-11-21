import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles.js'
import logout from 'App/helpers/auth/logout'
import LightButton from 'App/components/LightButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Row, Image, Subtitle, Caption } from '@shoutem/ui'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      email
    }
  }
`)
export default class Home extends React.Component {
  static propTypes = {
    me: PropTypes.object,
  }

  renderItem() {
    return (
      <Row style={{ flex: 1 }}>
        <Image
          styleName='small-avatar top'
          source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png' }}
        />
        <View styleName='vertical'>
          <View styleName='horizontal '>
            <Subtitle>Dustin Malone</Subtitle>
            <Caption>20 minutes ago</Caption>
          </View>
          <Text styleName='multiline'>asdadasdadasdadasdadasdadasdadasdadasdada</Text>
        </View>
      </Row>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Listado de numeros de contacto municipal</Text>
      </View>
    )
  }
}
