import React from 'react'
import styles, { touchableIcons } from './styles.js'
import textStyles from '/App/styles/texts'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { View, Text, TouchableOpacity, Row, Subtitle, Divider, Image } from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import email from 'react-native-email'
import call from 'react-native-phone-call'

export default class DirectoryDetailOfficial extends React.Component {
  static propTypes = {
    officer: PropTypes.object,
  }

  sendEmail(emailTo) {
    try {
      const to = [emailTo]
      email(to, {
        cc: [],
        bcc: '',
        subject: 'Contacto desde APP',
        body: '',
      }).catch(error => {
        Alert.alert('Email de contacto: ' + to)
      })
    } catch (error) {
      Alert.alert('Email de contacto: ' + to)
      console.log('[sendEmail]:', error)
    }
  }

  makeACall(phone) {
    try {
      call({
        number: phone,
        prompt: true,
      }).catch(error => {
        Alert.alert(`Número telefónico: ${phone}`)
      })
    } catch (error) {
      Alert.alert(`Número telefónico: ${phone}`)
      console.log('[makeACall]:', error)
    }
  }

  renderPhoneIcon(phone) {
    return (
      <TouchableOpacity style={touchableIcons} onPress={() => (phone ? this.makeACall(phone) : '')}>
        {phone ? <Ionicons styleName='disclosure' name='ios-call' color='green' size={28} /> : ''}
      </TouchableOpacity>
    )
  }

  renderEmailIcon(email) {
    return (
      <TouchableOpacity style={touchableIcons} onPress={() => (email ? this.sendEmail(email) : '')}>
        {email ? <Ionicons styleName='disclosure' name='ios-mail' size={28} /> : ''}
      </TouchableOpacity>
    )
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
      <View>
        <Row styleName='small'>
          {officer.image ? (
            <Image styleName='small rounded-corners' source={{ uri: officer.image }} />
          ) : (
            <Ionicons name='ios-contact' size={30} style={styles.leftIcon} />
          )}

          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle}>{officer.position}</Subtitle>
            <Text numberOfLines={2} style={textStyles.rowText}>
              {officer.name}
            </Text>
          </View>

          {this.renderEmailIcon(officer.email)}

          {this.renderPhoneIcon(officer.phone)}
        </Row>
        <Divider styleName='line' />
      </View>
    )
  }
}
