import React from 'react'
import PropTypes from 'prop-types'
import textStyles from 'App/styles/texts'
import moment from 'App/helpers/date/moment'
import { Image, View, Row, Subtitle, Caption, TouchableOpacity, Text, Divider } from '@shoutem/ui'

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
        <Row>
          <Image styleName='small rounded-corners' source={newsData.image} />
          <View styleName='vertical stretch space-between'>
            <Subtitle style={textStyles.rowSubtitle}>{newsData.title}</Subtitle>
            <Text numberOfLines={4} style={textStyles.rowText}>
              {newsData.subtitle}
            </Text>
            <Caption style={textStyles.rowCaption}>{newsData.date}</Caption>
          </View>
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }
}
