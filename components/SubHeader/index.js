import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'
import { View, Tile, Subtitle, Overlay, ImageBackground, TouchableOpacity } from '@shoutem/ui'
import Retry from 'providers/ApolloProvider/Retry'
import Loading from 'providers/ApolloProvider/Loading'
import Error from 'providers/ApolloProvider/ApolloError'
import { bannerBySectionQry } from 'queries'
import { Query } from 'react-apollo'
import { WebBrowser } from 'expo'
import { getMeQry } from 'queries'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { Alert } from 'react-native'

@withGraphQL(getMeQry, { loading: <Loading />, errorComponent: <Error /> })
export default class SubHeader extends React.Component {
  static propTypes = {
    view: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    me: PropTypes.object,
  }

  static defaultProps = {
    view: 'apps',
    title: '',
  }

  onPressBanner = async banner => {
    try {
      if (banner.targetUrl && banner.targetUrl.trim() !== '' && this.props.me) {
        const finalUrl = `${banner.targetUrl}?token=${this.props.me.userToken}`
        let result = await WebBrowser.openBrowserAsync(finalUrl)
        this.setState({ result })
      } else if (!this.props.me) {
        Alert.alert('Debe iniciar sesión para acceder', null, [
          { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Iniciar', onPress: () => this.props.navigation.navigate('Profile') },
        ])
      }
    } catch (error) {
      this.setState({ result: null })
    }
  }

  render() {
    const view = this.props.view
    const imageUrl = this.props.imageUrl
    let img =
      imageUrl && imageUrl.trim() !== ''
        ? { uri: imageUrl }
        : view === 'calendar'
        ? require('../../assets/images/views/calendar.png')
        : view === 'apps'
        ? require('../../assets/images/views/apps.png')
        : view === 'muni'
        ? require('../../assets/images/views/muni.jpg')
        : require('../../assets/images/views/directory.png')
    const pollInterval = 100 * 60 * 30 // 30 min
    return (
      <View style={styles.container}>
        <Query query={bannerBySectionQry(view)} pollInterval={pollInterval}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Loading />
            if (error) return <Retry callback={refetch} />

            const { bannerBySection } = data
            img =
              bannerBySection && bannerBySection.imageUrl ? { uri: bannerBySection.imageUrl } : img
            return (
              <TouchableOpacity onPress={() => this.onPressBanner(bannerBySection)}>
                <ImageBackground styleName='large-banner' source={img} style={styles.image}>
                  {!bannerBySection && (
                    <Tile style={styles.tile}>
                      <Overlay styleName='image-overlay'>
                        <Subtitle numberOfLines={2} style={styles.subTitle}>
                          {this.props.title}
                        </Subtitle>
                      </Overlay>
                    </Tile>
                  )}
                </ImageBackground>
              </TouchableOpacity>
            )
          }}
        </Query>
      </View>
    )
  }
}
