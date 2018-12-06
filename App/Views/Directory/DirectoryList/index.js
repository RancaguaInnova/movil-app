import React from 'react'
import styles from './styles.js'
import { ScrollView } from 'react-native'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import { WebBrowser } from 'expo'
export default class DirectoryList extends React.Component {
  static propTypes = {
    showDetail: PropTypes.func,
  }
  componentDidMount() {
    this.setState({
      list: [
        {
          name: 'Alcaldía',
          _id: 1,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 2,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 3,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 4,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 5,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 6,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 7,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía 8',
          _id: 8,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 9,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 10,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía11',
          _id: 11,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía',
          _id: 12,
          icon: 'ios-contact',
        },
        {
          name: 'Alcaldía 13',
          _id: 13,
          icon: 'ios-contact',
        },
      ],
    })
  }

  renderDirectoryItem(item) {
    return (
      <TouchableOpacity key={item._id} onPress={() => this.props.showDetail(item)}>
        <Row styleName='small'>
          <Ionicons name={item.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle>{item.name}</Subtitle>
            {/* <Text numberOfLines={2}>{app.description}</Text> */}
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    const list = this.state && this.state.list ? this.state.list : []
    return (
      <ScrollView>
        <View
          style={{
            minHeight: 80,
          }}
        >
          <Subtitle styleName='h-center' style={{ paddingTop: 30 }} numberOfLines={4}>
            Listado de departamentos municipales de Rancagua
          </Subtitle>
        </View>
        {list.map(item => this.renderDirectoryItem(item))}
      </ScrollView>
    )
  }
}
