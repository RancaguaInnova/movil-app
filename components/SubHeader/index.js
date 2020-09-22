import React from 'react'
import { Alert ,View,TouchableOpacity,ImageBackground,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import {Text } from  '@ui-kitten/components';
import './styles.js'
import { bannersBySectionQry, getMeQry } from 'providers/ApolloProvider/queries'
import { openWebView } from 'providers/StateProvider/WebView/actions'
import {  Overlay } from 'react-native-elements';
import { parseUrl } from '/helpers/url'
import { event } from '/helpers/analytics'


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 2,
  },
});

class SubHeader extends React.Component {
  static propTypes = {
    view: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    userToken: PropTypes.string,
  }

  static defaultProps = {
    view: 'apps',
    title: '',
  }

  onPressBanner = async banner => {
    try {
      if (banner.targetUrl && banner.targetUrl.trim() !== '' && this.props.userToken) {
        const finalUrl = parseUrl(banner.targetUrl, { token: this.props.userToken })
        this.props.openWebView(finalUrl)
        event(`click_banner_${this.props.view}_online`, banner.targetUrl)
      } else if (!this.props.userToken) {
        Alert.alert('Debe iniciar sesión para acceder', null, [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar', onPress: () => this.props.navigation.navigate('Profile') },
        ])
        event(`click_banner_${this.props.view}_offline`, banner.targetUrl)
      }
    } catch (error) {
      //this.setState({ result: null })
    }
  }

  render() {
    const view = this.props.view
    const imageUrl = this.props.imageUrl
    let img = ''
    return (
      <View>
        <Query query={bannersBySectionQry(view)} notifyOnNetworkStatusChange>
          {({ loading, error, data, refetch }) => {
            if (loading) return <View /> //<Loading />
            if (error) return <View /> //<Retry callback={refetch} />

            const { bannerBySection } = data
            img =
              bannerBySection && bannerBySection.imageUrl ? { uri: bannerBySection.imageUrl } : img
            if (img !== '') {
              return (
                <TouchableOpacity
                  onPress={() => this.onPressBanner(bannerBySection)}
                  style={styles.container}
                >
                  <ImageBackground styleName='large-banner' source={img} style={styles.image}>
                    {!bannerBySection ? (
                      <Text style={styles.text} category='h1'>
                        <Overlay styleName='image-overlay' isVisible>
                          <Text style={styles.text} category='s1'>
                            {this.props.title}
                          </Text>
                        </Overlay>
                      </Text>
                    ) : null}
                  </ImageBackground>
                </TouchableOpacity>
              )
            } else {
              return <View />
            }
          }}
        </Query>
      </View>
    )
  }
}

// Redux
const mapStateToProps = state => {
  const {
    auth: { session },
  } = state
  return {
    userToken: session && session.user && session.user.userToken ? session.user.userToken : null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openWebView: url => {
      dispatch(openWebView(url))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader)
