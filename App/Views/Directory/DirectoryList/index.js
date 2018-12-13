import React from 'react'
import styles from './styles.js'
import textStyles from '/App/styles/texts'
import { ScrollView } from 'react-native'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import { WebBrowser } from 'expo'
import SubHeader from '/App/components/SubHeader'
@withGraphQL(gql`
  {
    departments(limit: 100, page: 1) {
      items {
        _id
        name
        imageUrl
        address
        businessHours
      }
    }
  }
`)
export default class DirectoryList extends React.Component {
  static propTypes = {
    showDetail: PropTypes.func,
    departments: PropTypes.object,
  }

  renderDirectoryItem(item) {
    return (
      <TouchableOpacity key={item._id} onPress={() => this.props.showDetail(item)}>
        <Row styleName='small'>
          <Ionicons name={item.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{item.name}</Subtitle>
            {/* <Text numberOfLines={2}>{app.description}</Text> */}
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    const list =
      this.props.departments && this.props.departments.items ? this.props.departments.items : []
    return (
      <ScrollView>
        <SubHeader
          view='directory'
          title='Contacto con los Departamentos municipales de la Comuna'
        />
        {list.map(item => this.renderDirectoryItem(item))}
      </ScrollView>
    )
  }
}
