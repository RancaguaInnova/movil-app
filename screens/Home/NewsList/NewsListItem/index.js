/*import React from 'react'
import PropTypes from 'prop-types'
import textStyles from '../../../../styles/texts'
import moment from '../../../../helpers/date/moment'
import { Avatar, Text, Divider, ListItem } from '@ui-kitten/components'
import { StyleSheet,View,TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});
export default class NewsListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onClickNews: PropTypes.func,
  }

  getImage() {
    const defaultImg = {
      uri: 'http://fecira.com/wp-content/uploads/2017/08/LOGOS-final-02-1-300x300.png',
    }
    return this.props.data.imageUrl ? { uri: this.props.data.imageUrl } : defaultImg
  }

  render() {
    const newsData = {
      image: this.getImage(),
      title: this.props.data.title || '',
      subtitle: this.props.data.subtitle || '',
      date: moment(this.props.data.date).fromNow(),
      externalUrl: this.props.data.externalUrl || '',
    }
    return (
      <TouchableOpacity onPress={() => this.props.onClickNews(newsData)}>
        <View style={styles.row}>
          <Avatar styleName='small rounded-corners' source={newsData.image} />

          <View styleName='vertical stretch space-between'>
            <Text style={styles.text} category='s1'>{newsData.title}</Text>
            <Text numberOfLines={4} style={textStyles.rowText}>
              {newsData.subtitle}
            </Text>
            <Text style={textStyles.rowCaption}>{newsData.date}</Text>
          </View>
        </View>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }
}
*/
import React from 'react'
import { Avatar, Button, Divider, ListItem,useTheme } from '@ui-kitten/components'
import { Text, View ,StyleSheet} from 'react-native'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'


const ItemImage = (data) => (
  <Avatar
    source={data.image}
  />
)
const ButtonReadMore = (data, onClickNews) => {
  return (
    <View>{data && data.externalUrl ?
      <Button onClick={() => onClickNews( data )} size='tiny'>Leer Mas</Button> : ''}</View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textTitle: {
    margin: 4,
    fontSize:14,
    color:"#000",
    fontWeight:"bold"

  },
  textSubTitle:{
    margin: 4,
    fontSize:13,
    color:"#8f9bb3",
    textAlign:"justify"
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    backgroundColor: '#3366FF',
  },
});
const NewsListItem = ({ data, onClickNews }) => {
  const theme = useTheme();
  const getImage = () => {
    const defaultImg = {
      uri: 'http://fecira.com/wp-content/uploads/2017/08/LOGOS-final-02-1-300x300.png',
    }
    return data.imageUrl ? { uri: data.imageUrl } : defaultImg
  }
  const newsData = {
    image: getImage(),
    title: data.title || '',
    subtitle: data.subtitle || '',
    date: moment( data.date ).fromNow(),
    externalUrl: data.externalUrl || '',
  }
  return (
    <View >
      <ListItem
        title={(props)=><Text {...props} style={styles.textTitle} status='primary'>{newsData.title}</Text>}
        description={(props)=><Text {...props} style={styles.textSubTitle} status='primary'>{data.subtitle}</Text>}
        accessoryLeft={() => ItemImage( newsData )}
        ItemSeparatorComponent={Divider}
      //  accessoryRight={() => ButtonReadMore( newsData, onClickNews )}
        accessoryRight={() => <Ionicons styleName="disclosure" name="ios-arrow-forward"
                                        size={28} />}
      />
      <Divider styleName='line' />
    </View>
  )
}
export default NewsListItem
