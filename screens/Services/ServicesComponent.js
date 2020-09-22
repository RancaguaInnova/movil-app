import { Alert, ScrollView ,TouchableOpacity,View,StyleSheet} from 'react-native'
import { Divider, Text } from '@ui-kitten/components'
import { event, pageHit } from '/helpers/analytics'
import moment from 'moment'
import AppLink from 'react-native-app-link'
import Auth from 'screens/Auth'
import CustomHeader from 'components/CustomHeader'
import { Ionicons } from '@expo/vector-icons'
import Loading from 'components/Loading'
import { NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import React from 'react'
import SectionDivider from 'components/SectionDivider'
import SubHeader from 'components/SubHeader'
import { parseUrl } from '/helpers/url'
import  './styles'
import textStyles from 'styles/texts'
import autobind from 'autobind-decorator'
const pageName = 'services'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});
export default class Services extends React.Component {
    static propTypes = {
        session: PropTypes.object,
        getServices: PropTypes.func.isRequired,
        openWebView: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        services: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object
    }

    static navigationOptions = { header: <CustomHeader type="main" /> }

    async componentDidMount() {
        try {
            await this.props.getServices()
        } catch (error) {
            console.log('Error getting services:', error)
        }
    }

    // TODO: move this to a Redux action?
    async getMagicLink(app) {
        const userEmail = this.props.session.user.email
        if (!userEmail) {
            this.showNoSessionAlert('Debes iniciar sesión para acceder al servicio')
        }
        try {
            const response = await fetch(app.applicationURL, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    Authorization: `Bearer ${app.appToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_session: {
                        email: `${userEmail}`
                    }
                })
            })
            const { data: { attributes: { url } } } = await response.json()
            return url
        } catch (error) {
            this.showNoSessionAlert('Tu email no se encuentra registrado en Libreta Educativa!')
        }
    }

    @autobind
    updateServices(services) {
        try {
            async function gServices(cb) {
                const s = await cb()
            }

            if (services.updatedAt !== 'undefined') {
                const diff = moment().diff(moment(services.updatedAt), 'seconds')
                // 10 seconds cache
                if (diff > 10) {
                    gServices(this.props.getServices)
                }
            }
        } catch (error) {
            console.log('error!', error)
        }
    }

    showNoSessionAlert(message) {
        Alert.alert(message, null, [
            {
                text: 'Cancelar',
                onPress: () => {
                    event('click_service_login', 'cancel')
                },
                style: 'cancel'
            },
            {
                text: 'Iniciar',
                onPress: () => {
                    this.props.openModal(<Auth show="login" />)
                    event('click_service_login', 'login')
                }
            }
        ])
    }

    async openApp(app) {
        const { session } = this.props
        try {
            if (!app.appMovil) {
                if (
                    app.applicationURL &&
                    app.applicationURL.trim() !== '' &&
                    session &&
                    session.user &&
                    session.user.userToken
                ) {
                    let finalUrl
                    // TODO: Change this condition to check a more general flag
                    if (app.name === 'Libreta Educativa') {
                        const userUrl = await this.getMagicLink(app)
                        finalUrl = parseUrl(userUrl)
                    } else {
                        finalUrl = parseUrl(app.applicationURL, {
                            token: session.user.userToken
                        })
                    }
                    this.props.openWebView(finalUrl, false)
                    event('click_service_online', app.applicationURL)
                } else if (!session || !session.user || !session.user.userToken) {
                    this.showNoSessionAlert('Debes iniciar sesión para acceder al servicio')
                    event('click_service_offline', app.applicationURL)
                }
            } else {
                const { urlApp, appName, appStoreId, appStoreLocale, playStoreId } = app
                try {
                    await AppLink.maybeOpenURL(urlApp, {
                        appName,
                        appStoreId,
                        appStoreLocale,
                        playStoreId
                    })
                } catch (error) {
                    try {
                        await AppLink.openInStore({
                            appName,
                            appStoreId,
                            appStoreLocale,
                            playStoreId
                        })
                    } catch (error) {}
                }
            }
        } catch (error) {}
    }

    renderRow(app) {
        return (
            <TouchableOpacity key={app.name} onPress={() => this.openApp(app)}>
                <View style={styles.row}>
                    <Ionicons name={app.icon || 'ios-apps'} size={30} style={styles.leftIcon} />
                    <View styleName="vertical">
                      <Text style={styles.text} category='s1'>
                            {app.name}
                        </Text>
                        <Text
                            numberOfLines={3}
                            style={{ ...textStyles.rowText, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}
                        >
                            {app.description}
                        </Text>
                    </View>
                    <Ionicons styleName="disclosure" name="ios-arrow-forward" size={28} />
                </View>
                <Divider styleName="line" />
            </TouchableOpacity>
        )
    }

    @autobind
    onWillFocus(payload) {
        pageHit(pageName)
        const { services, loading, error } = this.props
        this.updateServices(services)
    }

    render() {
        pageHit(pageName)
        const { services, loading, error } = this.props

        const items = services && services.items ? services.items : []
        if (loading) {
            return <Loading />
        } else if (error) {
            return <Text>Ups! Ocurrió un error!</Text>
        } else {
            return (
                <View style={styles.container}>
                    <NavigationEvents onWillFocus={this.onWillFocus} />
                    <SectionDivider title="Servicios disponibles" />
                    <SubHeader
                        view="apps"
                        title="Seleccione el servicio"
                        navigation={this.props.navigation}
                        me={this.props.session}
                    />
                    <ScrollView>
                        {items.map(app => this.renderRow(app))}
                    </ScrollView>
                </View>
            )
        }
    }
}
