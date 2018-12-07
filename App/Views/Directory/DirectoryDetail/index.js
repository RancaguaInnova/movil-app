import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity } from '@shoutem/ui'
import DirectoryDetailOverlay from './DirectoryDetailOverlay'
import DirectoryContactOfficer from './DirectoryContactOfficer'

import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query officialsByDepartment($department: ID!) {
      officialsByDepartment(department: $department) {
        _id
        firstname
        lastname
        contactInformation {
          phone {
            areaCode
            number
            mobilePhone
          }
          email
        }
        position
        imageUrl
      }
    }
  `,
  {
    options: ownProps => ({
      variables: {
        department: ownProps.directory._id,
      },
    }),
  }
)
export default class DirectoryDetail extends React.Component {
  static propTypes = {
    closeDetail: PropTypes.func,
    directory: PropTypes.object,
    officialsByDepartment: PropTypes.array,
  }

  renderBackButton() {
    return (
      <TouchableOpacity onPress={() => this.props.closeDetail()} s>
        <Row styleName='small'>
          <Ionicons name='ios-arrow-back' size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle>Volver al directorio</Subtitle>
          </View>
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  render() {
    const officials = this.props.officialsByDepartment || []
    return (
      <View
        styleName='content'
        style={{
          top: 0,
          height: '100%',
        }}
      >
        {this.renderBackButton()}
        <ScrollView style={{ flex: 1 }}>
          <DirectoryDetailOverlay directory={this.props.directory} />
          {officials.map(officer => (
            <DirectoryContactOfficer officer={officer} key={officer._id} />
          ))}
        </ScrollView>
      </View>
    )
  }
}
