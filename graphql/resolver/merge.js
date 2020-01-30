const User = require('../../model/user-model')
const Event = require('../../model/event-model')
const {dateToString} = require('../../helpers/date')


const events = async eventids => {
  const events = await Event.find({_id: {$in: eventids}})
  return events.map(event => tranformEvent(event))
}

const user = async userid => {
  const result = await User.findById(userid)
  return {
    ...result._doc, password:null, 
    createdEvents:events.bind(this, result._doc.createdEvents)
  }
}

const tranformEvent = event => {
  console.log('CREATOR: ', event._doc.creator)
  return {
    ...event._doc,
    date:dateToString(event._doc.date),
    creator:user.bind(event._doc.creator)
  }
}

const tranformBooking = booking => {
  return  {...booking._doc, 
    user:user.bind(this, booking._doc.user),
    event:singleEvent.bind(this, booking._doc.event),
    created:dateToString(booking._doc.createdAt),
    updated:dateToString(booking._doc.updatedAt)
  }
}





const singleEvent = async eventId => {
  const event = await Event.findById(eventId)
  return tranformEvent(event)
}

module.exports = {user, events, singleEvent, tranformEvent, tranformBooking}