import React from 'react'
import { Font } from 'expo'
import Root from './Root'
import App from './Views'
import Auth from './Auth'

export default class AppRoot extends React.Component {
  componentDidMount () {
    Font.loadAsync({
      'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf')
    })
  }

  render () {
    return (
      <Root>
        <Auth forceLogin app={App} />
      </Root>
    )
  }
}
