const Event = require('../../model/event-model')
const User = require('../..//model/user-model')
const Booking = require('../../model/booking-model')


const {tranformBooking} = require('./merge')



module.exports = {
  bookings: async() => {
    const bookings = await Booking.find().populate('User')
    return bookings.map(booking => {
      return tranformBooking(booking)
    })
  },
  bookEvent:async(args) => {
    const booking = new Booking({
      user:await User.findById('5e305aabe46a99157920692f'),
      event:await Event.findById(args.eventId)
    })
    const bookedEvent = await booking.save()
    return {...bookedEvent._doc}
  },
  cancelEvent:async(args) => {
    const booking = await Booking.findById(args.bookingId).populate('event')
    const event = transformEvent(booking.event)
    await Booking.findByIdAndDelete(args.bookingId)
    return event
  }
}