import { Analytics, PageHit, ScreenHit, Event } from 'expo-analytics'

var analytics = null

const analyticsId = 'UA-133228609-2'

export const pageHit = function(pageName) {
  if (!analytics) analytics = new Analytics(analyticsId)
  console.log('pageHit!!!!!!!!', pageName)
  analytics
    .hit(new PageHit(pageName))
    .then(result => {
      //console.log('result pageHit', result)
    })
    .catch(error => {
      console.log('error pageHit!', error)
    })
}

export const screenHit = function(pageName) {
  if (!analytics) analytics = new Analytics(analyticsId)
  //console.log('screenHit!!!!!!!!')
  analytics
    .hit(new ScreenHit(pageName))
    .then(result => {
      //console.log('result screenHit', result)
    })
    .catch(error => {
      console.log('error screenHit!', error)
    })
}

export const event = function(event, action) {
  if (!analytics) analytics = new Analytics(analyticsId)
  //console.log('event!', event)
  analytics
    .event(new Event(event, action))
    .then(result => {
      //console.log('result event', result)
    })
    .catch(error => {
      console.log('error event!', error)
    })
}
