import React from 'react'
import { View, ScrollView } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { Field } from 'simple-react-form'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
import autobind from 'autobind-decorator'

import { pageHit, event } from '/helpers/analytics'
import Toggle from 'components/fields/Toggle'
import { Permissions, Notifications } from 'expo'

import styles from './styles.js'
import SectionDivider from 'components/SectionDivider'
import { registerDevice, updateProfile } from 'providers/StateProvider/Auth/actions'
import set from 'lodash/set'

class Subscriptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subscriptions: {
        absence: false,
        events: false,
        news: false,
      },
    }
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    subscriptions: PropTypes.object,
    registerDevice: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync()
    const userProfile =
      this.props.session && this.props.session.user ? this.props.session.user.profile : {}
    let profile = Object.assign({}, userProfile)
    this.setState({ subscriptions: this.props.subscriptions, profile })
  }

  @autobind
  async submit() {
    const { user } = this.props.session
    const userProfile = {
      _id: user._id,
      emails: user.emails,
      profile: this.state.profile || {},
    }

    userProfile.profile.subscriptions = this.state.subscriptions
    let userInput = Object.assign({}, userProfile)
    try {
      await this.props.updateProfile(userInput)
      event('subscriptions_update_success', JSON.stringify(userInput))
      // if (!this.props.error) Alert.alert('Datos actualizados con éxito')
    } catch ({ response, operation, graphQLErrors, networkError }) {
      // TODO: Use this in redux actions as a helper for displaying error messages
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
      event('subscriptions_update_error', JSON.stringify(errMsj))
    }
  }

  renderErrorMessage() {
    const { error } = this.props
    if (!error) return
    return <Text style={styles.errorMessage}>{error.message}</Text>
  }

  async registerForPushNotificationsAsync() {
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') return

      // Get the token that uniquely identifies this device
      let deviceToken = await Notifications.getExpoPushTokenAsync()
      let userId = this.props.userId
      // Call the GraphQL API to save the users device push token.
      await this.props.registerDevice({ userId, deviceToken })
    } catch (error) {
      console.log('Error registering device token:', error)
    }
  }

  handleChange = subsType => {
    let subsStatus = this.state.subscriptions[subsType]
    const state = Object.assign({}, this.state)
    set(state, `subscriptions.${subsType}`, !subsStatus)
    this.setState(state)
  }

  render() {
    pageHit('subscriptions')
    return (
      <View style={styles.container}>
        <SectionDivider title='Suscripciones' modal={true} />
        <ScrollView style={styles.content}>
          <Text style={{ padding: 15 }}>Marque las notificaciones de su interés</Text>
          <CheckBox
            title='Ausencia escolar'
            checked={ this.state.subscriptions.absence }
            onPress={ () => this.handleChange('absence') }
            checkedColor='#ff1248'
            containerStyle={styles.checkContainer}
          />
          <CheckBox
            title='Eventos'
            checked={ this.state.subscriptions.events }
            onPress={ () => this.handleChange('events') }
            checkedColor='#ff1248'
            containerStyle={styles.checkContainer}
          />
          <CheckBox
            title='Noticias'
            checked={ this.state.subscriptions.news }
            onPress={ () => this.handleChange('news') }
            checkedColor='#ff1248'
            containerStyle={styles.checkContainer}
          />
          {this.renderErrorMessage()}

          <Button
            loading={this.props.loading}
            onPress={this.submit}
            titleStyle={styles.submitTitle}
            buttonStyle={styles.submitButton}
            title='Guardar'
          />
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerDevice: (userId, token) => {
      dispatch(registerDevice(userId, token))
    },
    updateProfile: userInput => {
      dispatch(updateProfile(userInput))
    },
  }
}

const mapStateToProps = state => {
  const {
    auth: { loading, session, error },
  } = state
  return {
    userId: session.userId,
    session,
    subscriptions:
      session && session.user && session.user.profile && session.user.profile.subscriptions
        ? session.user.profile.subscriptions
        : { absence: false },
    loading,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)
