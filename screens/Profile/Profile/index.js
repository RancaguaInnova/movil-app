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
import { pageHit, event } from '/helpers/analytics'
import { NavigationEvents } from 'react-navigation'
import Identification from './Identification'
import Contact from './Contact'
import styles from './styles'
import textStyles from 'styles/texts'
//import moment from '../../helpers/date/moment'
import PropTypes from 'prop-types'
import { Form } from 'simple-react-form'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import Button from 'components/ShoutemButton'
import LightButton from 'components/LightButton'
import autobind from 'autobind-decorator'
import { saveSession, logout } from 'helpers/auth'
import { Alert } from 'react-native'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import { UserFragments } from 'providers/ApolloProvider/queries/User'
import SectionDivider from 'components/SectionDivider'
const pageName = 'profile'
@withGraphQL(
  gql`
    query getMe {
      me {
        emails {
          address
          verified
        }
        ...Profile
      }
    }
    ${UserFragments.Profile}
  `,
  { loading: <Loading />, errorComponent: Error }
)
@withMutation(gql`
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
`)
export default class Profile extends React.Component {
  static propTypes = {
    profile: PropTypes.object,
    onLogout: PropTypes.func,
    me: PropTypes.object,
  }

  componentDidMount() {
    let me = Object.assign({}, this.props.me)
    let streetNumber = ''
    // Horrible bypass to avoid invalid data type on text input
    if (me.profile && me.profile.address && me.profile.address.streetNumber) {
      me.profile.address.streetNumber = this.props.me.profile.address.streetNumber.toString()
    }
    this.setState({ me })
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
    event('logout', 'true')
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
    let user = Object.assign({}, this.state.me)
    this.setState({ loading: true })
    try {
      const response = await this.props.updateUser({ user })
      this.setState({
        errorMessage: '', //error.message.replace('GraphQL error:', ''),
        loading: false,
      })
      event('profile_update_success', JSON.stringify(user))
      Alert.alert('Datos actualizados con éxito')
    } catch ({ response, operation, graphQLErrors, networkError }) {
      const errMsj = []
      const arrError = graphQLErrors || []
      arrError.forEach(err => {
        const NaNStr = 'Float cannot represent non numeric value'
        if (err.validationErrors) {
          for (let k in err.validationErrors) {
            if (err.validationErrors[k] === 'required') {
              switch (k) {
                case 'user.profile.address.streetNumber':
                  errMsj.push('Número de calle es requerido')
                  break
                case 'user.profile.address.streetName':
                  errMsj.push('Nombre de calle es requerido')
              }
            } else {
              errMsj.push('Ups!', JSON.stringify(err.validationErrors))
            }
          }
        } else if (
          err.message.indexOf(NaNStr) !== -1 &&
          err.message.indexOf('value.profile.address.streetNumber') !== -1
        ) {
          errMsj.push('El número de calle ingresado no es válido')
        } else {
          errMsj.push(err.message)
        }
      })

      const msj =
        errMsj.length > 0 ? errMsj.join(', ') : 'Ups! Ocurrio un problema al guardar los datos'
      this.setState({
        errorMessage: msj,
        loading: false,
      })
      event('profile_update_error', JSON.stringify(errMsj))
    }
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

  @autobind
  onChange(change) {
    this.setState({ me: change })
  }

  render() {
    pageHit(pageName)
    const menu = [
      { title: 'Identificación', action: () => this.setCurrentSection(0) },
      { title: 'Contacto', action: () => this.setCurrentSection(1) },
    ]
    const defaultSection = this.sections[this.state.currentSection]
    return (
      <View style={styles.container}>
        <SectionDivider title='' menu={menu} />
        <ScrollView styleNames='fill-container' style={styles.container}>
          <Form state={this.state.me} onChange={this.onChange}>
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
          <LightButton onPress={this.signOut} title='Cerrar Sesión' />
        </ScrollView>
      </View>
    )
  }
}
