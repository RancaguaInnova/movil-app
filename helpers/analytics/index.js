import { Analytics, PageHit, ScreenHit, Event } from 'expo-analytics'

var analytics = null

const analyticsId = 'UA-133228609-2'
const lastHit = {
  page: '',
  screen: '',
  event: '',
  action: '',
}

export const pageHit = function(pageName) {
  if (lastHit.page !== pageName) {
    lastHit.page = pageName
    if (!analytics) analytics = new Analytics(analyticsId)
    analytics
      .hit(new PageHit(pageName))
      .then(result => {})
      .catch(error => {
        console.log('error pageHit!', error)
      })
  }
}

export const screenHit = function(pageName) {
  if (lastHit.screen !== pageName) {
    lastHit.screen = pageName
    if (!analytics) analytics = new Analytics(analyticsId)
    analytics
      .hit(new ScreenHit(pageName))
      .then(result => {})
      .catch(error => {
        console.log('error screenHit!', error)
      })
  }
}

export const event = function(ev, action) {
  if (lastHit.event !== ev || lastHit.action !== action) {
    lastHit.event = ev
    lastHit.action = action
    if (!analytics) analytics = new Analytics(analyticsId)
    analytics
      .event(new Event(ev, action))
      .then(result => {})
      .catch(error => {
        console.log('error event!', error)
      })
  }
}
