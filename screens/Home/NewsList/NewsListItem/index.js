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
import { Avatar, Button, Divider, ListItem } from '@ui-kitten/components'
import { View } from 'react-native'
import moment from 'moment'


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
const NewsListItem = ({ data, onClickNews }) => {

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
    <View>
      <ListItem
        title={newsData.title}
        description={data.subtitle}
        accessoryLeft={() => ItemImage( newsData )}
        ItemSeparatorComponent={Divider}
        accessoryRight={() => ButtonReadMore( newsData, onClickNews )}
      />
      <Divider styleName='line' />
    </View>
  )
}
export default NewsListItem
