import React from 'react'
import { ScrollView, Button } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { pageHit } from '/helpers/analytics'
import { View, Text, Subtitle, Row, Divider, TouchableOpacity, Caption } from '@shoutem/ui'
import styles from './styles'
import Loading from 'providers/ApolloProvider/Loading'
import textStyles from './../../styles/texts'
import PropTypes from 'prop-types'
import moment from '../../helpers/date/moment'
import SubHeader from './../../components/SubHeader'
import SectionDivider from '../../components/SectionDivider'
import DepartmentDetail from './DepartmentDetail'
import autobind from 'autobind-decorator'
import { directoryListQry } from 'providers/ApolloProvider/queries'
import { Query } from 'react-apollo'
const pageName = 'directory/list'
export default class Directory extends React.Component {
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
        <SubHeader
          view='directory'
          title='Contacto con los departamentos comunales'
          navigation={this.props.navigation}
        />
        <SectionDivider title='Departamentos' />
        <ScrollView>{list.map(directory => this.renderDirectoryItem(directory))}</ScrollView>
      </View>
    )
  }

  render() {
    pageHit(pageName)
    const pollInterval = 100 * 60 * 60 // 60 min
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        {this.state.selected ? (
          <DepartmentDetail department={this.state.selected} close={this.closeDetail} />
        ) : (
          <Query query={directoryListQry} pollInterval={pollInterval}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <Loading />
              if (error) return <Retry callback={refetch} />
              const directory =
                data && data.departmentsList && data.departmentsList.items
                  ? data.departmentsList.items
                  : []
              return this.renderDirectoryList(directory)
            }}
          </Query>
        )}
      </View>
    )
  }
}
