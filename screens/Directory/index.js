import React from 'react'
import { ScrollView, Button,View ,TouchableOpacity,StyleSheet} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { pageHit } from '/helpers/analytics'
import {Text, Divider  } from '@ui-kitten/components';
import { Query } from 'react-apollo'
import autobind from 'autobind-decorator'
import './styles'
import textStyles from 'styles/texts'
import Loading from 'providers/ApolloProvider/Loading'
import Retry from 'providers/ApolloProvider/Retry'
import { directoryListQry } from 'providers/ApolloProvider/queries'


import SubHeader from 'components/SubHeader'
import SectionDivider from 'components/SectionDivider'
import CustomHeader from 'components/CustomHeader'
import DepartmentDetail from './DepartmentDetail'

const pageName = 'directory/list'
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});

export default class Directory extends React.Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam('header')) {
      return {
        header: navigation.getParam('header'),
      }
    } else {
      return {
        header: <CustomHeader type='main' />,
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
          }}
        >
          <View style={styles.row}>
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
              <Text style={styles.text} category='h3'>
                {item.name}
              </Text>
            </View>
          </View>
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
    const address =
      item.contactInformation && item.contactInformation.address
        ? item.contactInformation.address
        : {}
    const strAddress = `${address.streetName || ''} ${address.streetNumber || ''}, ${address.city ||
      ''}`
    return (
      <TouchableOpacity key={item._id} onPress={() => this.showDetail(item)}>
        <Row style={{ marginBottom: 5 }}>
          <Ionicons name={item.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{item.name}</Subtitle>
            <Text numberOfLines={3} style={{ ...textStyles.rowText, ...styles.itemSubtitle }}>
              {strAddress}
            </Text>
          </View>
          <Ionicons styleName='disclosure' name='ios-arrow-forward' size={28} />
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }

  renderDirectoryList(list) {
    return <ScrollView>{list.map(directory => this.renderDirectoryItem(directory))}</ScrollView>
  }

  render() {
    pageHit(pageName)
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        {this.state.selected ? (
          <DepartmentDetail department={this.state.selected} close={this.closeDetail} />
        ) : (
          <View style={styles.container}>
            <SubHeader
              view='directory'
              title='Contacto con los departamentos comunales'
              navigation={this.props.navigation}
            />
            <SectionDivider title='Departamentos' />
            <Query query={directoryListQry} notifyOnNetworkStatusChange>
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
          </View>
        )}
      </View>
    )
  }
}
