import React from 'react'
import styles from './styles'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import TimerMixin from 'react-timer-mixin'
import autobind from 'autobind-decorator'
import { Image as Img } from 'react-native-elements'
import { connect } from 'react-redux'
import { banners } from 'providers/StateProvider/Banner/actions'
import { cards } from 'providers/StateProvider/Cards/actions'
import { event } from '/helpers/analytics'
import { openModal } from 'providers/StateProvider/Modal/actions'
import { parseUrl } from '/helpers/url'
import SvgUri from 'expo-svg-uri'

import { Ionicons } from '@expo/vector-icons'
import Auth from 'screens/Auth'
import { openWebView } from 'providers/StateProvider/WebView/actions'

class HomeBanner extends React.Component {
	effect = {
		in: 'fadeInRight',
		out: 'fadeOutLeft'
	}

	state = { current: 0, previous: 0, hide: -1, timer: [] }

	static propTypes = {
		style: PropTypes.any,
		userToken: PropTypes.string,
		banners: PropTypes.func,
		cards: PropTypes.func,
		list: PropTypes.array,
		loading: PropTypes.bool,
		openWebView: PropTypes.func,
		openModal: PropTypes.func
	}

	async componentDidMount() {
		try {
			await Promise.all([ this.props.banners('home'), this.props.cards() ])
		} catch (error) {
			console.log('Error getting services:', error)
		}
	}
	@autobind
	nextBanner() {
		const next = this.state.current < this.props.list.length - 1 ? this.state.current + 1 : 0
		const state = this.state
		state.previous = state.current
		state.current = next
		//state.timer.push(timer)
		this.setState(state)
	}

	@autobind
	hideBanner(idx) {
		const state = this.state
		state.hide = idx
		const timer = this.state.timer
		const oldTimer = timer.shift()
		state.timer = timer
		this.setState(state)
		TimerMixin.clearTimeout(oldTimer)
	}

	componentWillUnmount() {
		this.state.timer.map((timer) => {
			TimerMixin.clearTimeout(timer)
		})
	}

	@autobind
	async onPressBanner(banner) {
		try {
			if (banner.targetUrl && banner.targetUrl.trim() !== '' && this.props.userToken) {
				const finalUrl = parseUrl(banner.targetUrl, { token: this.props.userToken })
				this.props.openWebView(finalUrl)
				event('click_banner_online', finalUrl)
			} else if (!this.props.userToken) {
				Alert.alert('Debe iniciar sesión para acceder', null, [
					{ text: 'Cancelar', style: 'cancel' },
					{
						text: 'Iniciar',
						onPress: () => {
							this.props.openModal(<Auth show='login' />)
						}
					}
				])
				event('click_banner_offline', banner.targetUrl)
			}
		} catch (error) {
			event('click_banner_error', JSON.stringify(error))
		}
	}

	renderIcon(card) {
		const type =
			!card.iconUrl || (card.iconUrl && card.iconUrl.trim() == '')
				? 'icon'
				: card.iconUrl && card.iconUrl.indexOf('.svg') !== -1 ? 'svg' : 'image'
		return (
			<View style={{ height: '90%', width: 80 }}>
				{type === 'icon' ? (
					<Ionicons name={card.icon} color='white' size={50} />
				) : type === 'svg' ? (
					<SvgUri
						width='100%'
						height='100%'
						fill='#ff0648'
						fillAll={true}
						source={{
							uri: card.iconUrl
						}}
					/>
				) : (
					<View />
				)}
			</View>
		)
	}

	renderIndicator(indicator, idx) {
		return (
			<View style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
				<View
					style={{
						flexDirection: 'column',
						flex: 0.7,
						display: 'flex',
						backgroundColor: '#ff0648'
					}}
				>
					{
						<ListItem
						/*
							containerStyle={{ height: '100%', backgroundColor: '#ff0648' }}
							titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
							subtitleStyle={{ color: 'white' }}
							rightElement={
								<View>
									<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>
										{indicator.datum}
										{indicator.measurementUnit}
									</Text>
								</View>
							}*/
						>


            <ListItem.Content>
            <ListItem.Title>{indicator.title}</ListItem.Title>
            <ListItem.Subtitle>{indicator.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>

					}
				</View>
				<View
					style={{
						flexDirection: 'column',
						flex: 0.3,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#e7e6e6'
					}}
				>
					<Animatable.View animation='bounceIn' iterationCount='infinite'>
						{this.state.hide !== idx ? this.renderIcon(indicator) : null}
					</Animatable.View>
				</View>
			</View>
		)
	}

	renderBanner(banner, idx) {
		return (
			<TouchableOpacity
				onPress={() => this.onPressBanner(banner)}
				style={{ height: '100%', width: '100%', flexDirection: 'row' }}
			>
				<View
					style={{
						flexDirection: 'column',
						flex: 0.7,
						display: 'flex'
					}}
				>
					<View>
						<Img
							source={{
								uri: banner.imageUrl
							}}
							style={{ width: '100%', height: '100%' }}
							PlaceholderContent={<ActivityIndicator />}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'column',
						flex: 0.3,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#ff0648'
					}}
				>
					<Animatable.Text
						animation='bounceIn'
						iterationCount='infinite'
						style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}
					>
						+ INFO
					</Animatable.Text>
				</View>
			</TouchableOpacity>
		)
	}

	renderSlider(banner, idx) {
		if (
			(idx !== this.state.hide && idx === this.state.current) ||
			(idx !== this.state.hide && idx === this.state.previous)
		) {
			const effect = this.state.current === idx ? this.effect.in : this.effect.out
			const delay = 200

			return (
				<Animatable.View
					key={idx}
					animation={effect}
					duration={200}
					delay={delay}
					style={styles.bannerContainer}
					onAnimationEnd={() => {
						if (effect === this.effect.in) {
							if (this.props.list.length > 1) {
								const state = this.state
								state.timer.push(
									TimerMixin.setTimeout(() => {
										this.nextBanner()
									}, 5000)
								)
								this.setState(state)
							}
						} else {
							this.hideBanner(idx)
						}
					}}
				>
					{banner.type === 'banner' ? this.renderBanner(banner, idx) : this.renderIndicator(banner, idx)}
				</Animatable.View>
			)
		} else {
			return <View key={idx} />
		}
	}

	render() {
		if (this.props.list && this.props.list.length > 0) {
			return (
				<View style={{ ...styles.container, backgroundColor: '#ff1248' }}>
					{this.props.list.map((banner, idx) => this.renderSlider(banner, idx))}
				</View>
			)
		} else if (this.props.loading) {
			return <View style={styles.container} />
		} else {
			return <View />
		}
	}
}

HomeBanner = Animatable.createAnimatableComponent(HomeBanner)

const mapDispatchToProps = (dispatch) => {
	return {
		banners: (section) => {
			dispatch(banners(section))
		},
		cards: () => {
			dispatch(cards())
		},
		openModal: (child) => {
			dispatch(openModal(child))
		},
		openWebView: (url) => {
			dispatch(openWebView(url))
		}
	}
}

const mapStateToProps = (state) => {
	const { banner, cards, auth } = state
	const bannerList = banner && banner.data && banner.data.bannersBySection ? banner.data.bannersBySection : []
	const cardsList = cards && cards.data && cards.data.cardsList ? cards.data.cardsList : []

	const session = auth && auth.session ? auth.session : null
	return {
		list: bannerList.concat(cardsList),
		loading: (banner && banner.loading === true) || (cards && cards.loading === true) ? true : false,
		userToken: session && session.user && session.user.userToken ? session.user.userToken : null
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner)
