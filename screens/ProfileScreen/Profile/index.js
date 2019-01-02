import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Title,
  Subtitle,
  Row,
  Divider,
  TouchableOpacity,
} from '@shoutem/ui'
import { Ionicons } from '@expo/vector-icons'
import Identification from './Identification'
import Contact from './Contact'
import styles from './styles'
import textStyles from '../../../styles/texts'
//import moment from '../../helpers/date/moment'
import PropTypes from 'prop-types'
import { Form } from 'simple-react-form'
import Button from '../../../components/ShoutemButton'
import LightButton from '../../../components/LightButton'
import autobind from 'autobind-decorator'
import logout from '../../../helpers/auth/logout'
import saveSession from '../../../helpers/auth/saveSession'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import { UserFragments } from '../../../queries/User'
import SectionDivider from '../../../components/SectionDivider'

/* @withMutation(gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      emails {
        address
        verified
      }
      ...Profile
    }
  }
  ${UserFragments.Profile}
`) */
export default class Profile extends React.Component {
  static propTypes = {
    profile: PropTypes.object,
    onLogout: PropTypes.func,
    me: PropTypes.object,
  }

  /* static defaultProps = {
    me: {
      educationalLevel: {},
    },
  } */

  static getDerivedStateFromProps(props, state) {
    let me = Object.assign({}, props.me)
    let streetNumber = ''
    // Horrible bypass to avoid invalid data type on text input
    if (me.profile && me.profile.address) {
      me.profile.address.streetNumber = streetNumber.toString()
    }
    return { me }
  }

  state = {
    section: 'identification',
    errorMessage: '',
    currentSection: 0,
  }

  sections = [
    {
      key: 'identification',
      name: 'Identificación',
      description: 'Ingrese sus datos Personales',
      icon: 'ios-person',
      component: Identification,
    },
    {
      key: 'contact',
      name: 'Contacto',
      description: 'Ingrese sus datos de dirección y teléfono',
      icon: 'ios-contacts',
      component: Contact,
    },
  ]

  componentDidMount() {
    console.log('ME:', this.props.me)
    //this.setState({ profile: this.props.data.me })
  }

  @autobind
  setCurrentSection(index) {
    this.setState({ currentSection: index })
  }

  @autobind
  async signOut() {
    this.setState({ loading: true })
    await logout()
    await saveSession(null)
    this.props.onLogout()
    //this.props.navigation.navigate('Home')
  }

  renderLogoutButton() {
    if (this.props.me) {
      return <LightButton onPress={this.signOut} title='Cerrar Sesión' />
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  @autobind
  async submit() {
    /* let user = Object.assign({}, this.state.me)
    this.setState({ loading: true })
    try {
      await this.props.updateUser({ user })
    } catch (error) {
      console.log('Error updating user:', error)
      this.setState({
        errorMessage: error.message.replace('GraphQL error:', ''),
      })
    }
    this.setState({ loading: false }) */
  }

  @autobind
  renderArrowIcon(sectionKey) {
    if (this.state.section === sectionKey) return 'ios-arrow-dropup'
    return 'ios-arrow-dropdown'
  }

  @autobind
  renderSection(section) {
    return (
      <TouchableOpacity key={section.name}>
        <Row styleName='small'>
          <Ionicons name={section.icon} size={30} style={styles.leftIcon} />
          <View styleName='vertical'>
            {/* <Subtitle style={textStyles.rowSubtitle}>{section.name}</Subtitle> */}
            <Text numberOfLines={2} style={{ ...textStyles.rowText, paddingLeft: 5 }}>
              {section.description}
            </Text>
          </View>
        </Row>
        <Divider styleName='line' />
        {<section.component active={true} />}
      </TouchableOpacity>
    )
  }

  render() {
    const menu = [
      { title: 'Identificación', action: () => this.setCurrentSection(0) },
      { title: 'Contacto', action: () => this.setCurrentSection(1) },
    ]
    const defaultSection = this.sections[this.state.currentSection]
    //console.log('me', this.state.profile)
    return (
      <View style={styles.container}>
        <SectionDivider title='' menu={menu} />
        <ScrollView styleNames='fill-container' style={styles.container}>
          <Form state={this.state.me} onChange={changes => this.setState({ me: changes })}>
            {this.renderSection(defaultSection)}
          </Form>
          {this.renderErrorMessage()}
          <Button
            loading={this.state.loading}
            onPress={this.submit}
            label='Guardar'
            iconName='save'
            style={{ marginTop: this.state.errorMessage ? 5 : 40 }}
          />
          {this.renderLogoutButton()}
        </ScrollView>
      </View>
    )
  }
}
