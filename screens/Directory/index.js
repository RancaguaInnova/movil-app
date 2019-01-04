import React from 'react'
import { ScrollView, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity, Caption } from '@shoutem/ui'
import styles from './styles'
import textStyles from './../../styles/texts'
import PropTypes from 'prop-types'
import moment from '../../helpers/date/moment'
import SubHeader from './../../components/SubHeader'
import SectionDivider from '../../components/SectionDivider'
import DepartmentDetail from './DepartmentDetail'
import autobind from 'autobind-decorator'
import { graphql } from 'react-apollo'
import { directoryListQry } from './../../queries/'

class Directory extends React.Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('header')) {
      return {
        header: navigation.getParam('header'),
      }
    } else {
      return {
        title: navigation.getParam('title') || 'Directorio',
      }
    }
  }

  static propTypes = {
    data: PropTypes.shape({
      departments: PropTypes.object,
    }),
  }

  state = { selected: false }

  @autobind
  showDetail(item) {
    this.setState({ selected: item })
    this.props.navigation.setParams({
      header: (
        <View
          style={{
            flex: 0.2,
            paddingTop: 25,
            backgroundColor: 'white',
            /* borderColor: 'green',
            borderWidth: 1, */
          }}
        >
          <Row styleName='small'>
            <TouchableOpacity
              style={{
                width: 60,
                /* borderColor: 'red',
                borderWidth: 1, */
                height: '100%',
                paddingTop: 0,
              }}
              onPress={() => this.closeDetail()}
            >
              <Ionicons name='ios-arrow-back' size={25} style={styles.leftIcon} />
            </TouchableOpacity>
            <View styleName='vertical'>
              <Subtitle styleName='h-center' numberOfLines={2}>
                {item.name}
              </Subtitle>
            </View>
          </Row>
        </View>
      ),
    })
  }

  @autobind
  closeDetail() {
    this.setState({ selected: false })
    this.props.navigation.setParams({ title: 'Directorio', header: null })
  }

  renderDirectoryItem(item) {
    return (
      <TouchableOpacity key={item._id} onPress={() => this.showDetail(item)}>
        <Row styleName='small'>
          <Ionicons name={item.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{item.name}</Subtitle>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  renderDirectoryList(list) {
    return (
      <View style={styles.container}>
        <SubHeader view='directory' title='Contacto con los departamentos comunales' />
        <SectionDivider title='Departamentos' />
        <ScrollView>{list.map(directory => this.renderDirectoryItem(directory))}</ScrollView>
      </View>
    )
  }

  render() {
    const directory =
      this.props.data.departments && this.props.data.departments.items
        ? this.props.data.departments.items
        : []
    return (
      <View style={styles.container}>
        {this.state.selected ? (
          <DepartmentDetail department={this.state.selected} close={this.closeDetail} />
        ) : (
          this.renderDirectoryList(directory)
        )}
      </View>
    )
  }
}

export default graphql(directoryListQry)(Directory)
