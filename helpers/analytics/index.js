import { Analytics, PageHit, ScreenHit, Event } from 'expo-analytics'

var analytics = null

const analyticsId = 'UA-133228609-2'

export const pageHit = function(pageName) {
  if (!analytics) analytics = new Analytics(analyticsId)
  analytics
    .hit(new PageHit(pageName))
    .then(result => {})
    .catch(error => {
      console.error('error pageHit!', error)
    })
}

export const screenHit = function(pageName) {
  if (!analytics) analytics = new Analytics(analyticsId)
  analytics
    .hit(new ScreenHit(pageName))
    .then(result => {})
    .catch(error => {
      console.error('error screenHit!', error)
    })
}

export const event = function(event, action) {
  if (!analytics) analytics = new Analytics(analyticsId)
  analytics
    .event(new Event(event, action))
    .then(result => {})
    .catch(error => {
      console.error('error event!', error)
    })
}
