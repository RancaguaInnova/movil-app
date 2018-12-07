import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Row, Subtitle, Divider, Image } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import email from 'react-native-email'
import call from 'react-native-phone-call'

export default class DirectoryDetailOfficer extends React.Component {
  static propTypes = {
    officer: PropTypes.object,
  }

  sendEmail(emailTo) {
    const to = [emailTo]
    email(to, {
      cc: [],
      bcc: '',
      subject: 'Contacto desde APP',
      body: '',
    }).catch(console.error)
  }

  makeACall(phone) {
    call({
      number: phone,
      prompt: true,
    }).catch(console.error)
  }

  render() {
    const contact = this.props.officer.contactInformation || {}

    const officer = {
      _id: this.props.officer._id,
      name: `${this.props.officer.firstname} ${this.props.officer.lastname}`,
      position: this.props.officer.position,
      image: this.props.officer.imageUrl,
      phone:
        contact.phone.number && contact.phone.areaCode
          ? `${contact.phone.areaCode}${contact.phone.number}`
          : contact.phone.mobilePhone,
      email: contact.email,
    }
    return (
      <TouchableOpacity>
        <Row styleName='small'>
          {officer.image ? (
            <Image styleName='small rounded-corners' source={{ uri: officer.image }} />
          ) : (
            <Ionicons name='ios-contact' size={30} style={styles.leftIcon} />
          )}

          <View styleName='vertical'>
            <Subtitle>{officer.position}</Subtitle>
            <Text numberOfLines={2}>{officer.name}</Text>
          </View>

          {officer.email ? (
            <Ionicons
              styleName='disclosure'
              name='ios-mail'
              size={28}
              onPress={() => this.sendEmail(officer.email)}
              style={{ paddingRight: 25 }}
            />
          ) : null}
          {officer.phone ? (
            <Ionicons
              styleName='disclosure'
              onPress={() => this.makeACall(officer.phone)}
              name='ios-call'
              color='green'
              size={28}
            />
          ) : null}
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    )
  }
}
