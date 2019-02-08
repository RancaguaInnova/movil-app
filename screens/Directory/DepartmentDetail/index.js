import React from 'react'
import { ScrollView, Alert } from 'react-native'
import { pageHit, event } from '/helpers/analytics'
import { NavigationEvents } from 'react-navigation'
import { View, Text, Divider, Caption, Row, Subtitle, Image, TouchableOpacity } from '@shoutem/ui'
import styles, { touchableIcons } from './styles'
import textStyles from './../../../styles/texts'
import PropTypes from 'prop-types'
import moment from '../../../helpers/date/moment'
import SubHeader from '../../../components/SubHeader'
import SectionDivider from '../../../components/SectionDivider'
import { Ionicons } from '@expo/vector-icons'
import autobind from 'autobind-decorator'
import email from 'react-native-email'
import call from 'react-native-phone-call'
import { graphql } from 'react-apollo'
import { officialsByDepartmentQry } from './../../../queries/'
const pageName = 'directory/detail'
class DepartmentDetail extends React.Component {
  static propTypes = {
    department: PropTypes.object,
    data: PropTypes.shape({
      officialsByDepartment: PropTypes.array,
    }),
    close: PropTypes.func,
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
    event('click_directory_department_email', emailTo)
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
    event('click_directory_department_phone', phone)
  }

  renderPhoneIcon(phone) {
    return (
      <TouchableOpacity
        style={touchableIcons}
        onPress={() => (phone ? this.makeACall(phone) : <Text />)}
      >
        {phone && <Ionicons styleName='disclosure' name='ios-call' color='green' size={28} />}
      </TouchableOpacity>
    )
  }

  renderEmailIcon(email) {
    return (
      <TouchableOpacity
        style={touchableIcons}
        onPress={() => (email ? this.sendEmail(email) : <Text />)}
      >
        {email && <Ionicons styleName='disclosure' name='ios-mail' size={28} />}
      </TouchableOpacity>
    )
  }

  renderOfficer(officer) {
    const fullName = `${officer.firstname} ${officer.lastname}`
    const phone = officer && officer.contactInformation ? officer.contactInformation.phone : {}
    const contactPhone = phone.mobilePhone
      ? phone.mobilePhone
      : `${phone.areaCode || ''}${phone.number || ''}`
    return (
      <View key={officer._id}>
        <Row styleName='small'>
          {officer.imageUrl ? (
            <Image styleName='small rounded-corners' source={{ uri: officer.imageUrl }} />
          ) : (
            <Ionicons name='ios-contact' size={30} style={styles.leftIcon} />
          )}

          <View styleName='vertical'>
            <Subtitle style={textStyles.rowSubtitle} numberOfLines={2}>
              {fullName}
            </Subtitle>
            <Text numberOfLines={2} style={textStyles.rowText}>
              {officer.position}
            </Text>
          </View>

          {this.renderEmailIcon(officer.contactInformation.email)}

          {this.renderPhoneIcon(contactPhone)}
        </Row>
        <Divider styleName='line' />
      </View>
    )
  }

  render() {
    pageHit(pageName)
    const department = this.props.department || {}
    const address =
      department.contactInformation && department.contactInformation.address
        ? department.contactInformation.address
        : {}
    const strAddress = `${address.streetName || ''} ${address.streetNumber || ''}, ${address.city ||
      ''}`
    const officials = this.props.data.officialsByDepartment || []
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => pageHit(pageName)} />
        <SubHeader view='muni' title={strAddress} imageUrl={department.imageUrl} />
        <SectionDivider title={department.businessHours || ''} />
        {strAddress !== '' && (
          <Subtitle
            styleName='h-center'
            style={{
              ...textStyles.rowSubtitle,
              backgroundColor: '#6d2533',
              color: 'white',
              marginBottom: 5,
            }}
            numberOfLines={2}
          >
            {strAddress}
          </Subtitle>
        )}
        <ScrollView>{officials.map(officer => this.renderOfficer(officer))}</ScrollView>
      </View>
    )
  }
}

export default graphql(officialsByDepartmentQry, {
  options: ownProps => ({
    variables: {
      department: ownProps.department && ownProps.department._id ? ownProps.department._id : '',
    },
  }),
})(DepartmentDetail)
