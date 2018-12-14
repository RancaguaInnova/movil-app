/* global babelHelpers */
import applyDecoratedDescriptor from '@babel/runtime/helpers/es6/applyDecoratedDescriptor'
import initializerDefineProperty from '@babel/runtime/helpers/es6/initializerDefineProperty'

// symbol polyfills
global.Symbol = require('core-js/es6/symbol')
require('core-js/fn/symbol/iterator')

// collection fn polyfills
require('core-js/fn/map')
require('core-js/fn/set')
require('core-js/fn/array/find')

Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty
})

import React from 'react'
import { Font } from 'expo'
import Root from './App/Root'
import App from './App/Views'
import Auth from './App/Auth'

export default class AppRoot extends React.Component {
  componentDidMount () {
    Font.loadAsync({
      'Rubik-Regular': require('./App/assets/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./App/assets/fonts/rubicon-icon-font.ttf')
    })
  }

  render () {
    return (
      <Root>
        <Auth app={App} />
      </Root>
    )
  }
}
