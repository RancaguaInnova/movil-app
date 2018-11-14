import React from 'react'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'

@withGraphQL(gql`
  query getMe {
    me {
      _id
      profile {
        identifier
      }
      email
    }
  }
`)
export default class Apps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apps: [
        {
          name: 'Desarrollo Social',
          description: 'Dideco',
          icon: 'ios-contacts',
        },
        {
          name: 'Salud',
          description: 'Reserva de horas en Cesfam',
          icon: 'md-medkit',
        },
        {
          name: 'Educación',
          description: 'App Libreta educativa',
          icon: 'ios-school',
        },
        {
          name: 'Dirección Obras',
          description: 'Plano Regulador',
          icon: 'ios-hammer',
        },
        {
          name: 'Tránsito',
          description: 'Reserva de hora Licencia de Conducir',
          icon: 'ios-car',
        },
      ],
    }
  }

  static propTypes = {
    me: PropTypes.object,
  }

  renderRow(app) {
    return (
      <TouchableOpacity key={app.name}>
        <Row styleName='small'>
          <Ionicons name={app.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle>{app.name}</Subtitle>
            <Text numberOfLines={2}>{app.description}</Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    const apps = this.state.apps
    return (
      <View styleName='content'>
        <View
          style={{
            minHeight: 80,
          }}
        >
          <Subtitle styleName='h-center' style={{ paddingTop: 30 }} numberOfLines={4}>
            Seleccione el trámite que desea realizar
          </Subtitle>
        </View>
        <Divider styleName='line' />
        {apps.map(app => this.renderRow(app))}
      </View>
    )
  }
}
