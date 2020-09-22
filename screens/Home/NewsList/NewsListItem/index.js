import React from 'react'
import PropTypes from 'prop-types'
import textStyles from '../../../../styles/texts'
import moment from '../../../../helpers/date/moment'
import { Avatar, Text, Divider, Tooltip } from '@ui-kitten/components'
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
