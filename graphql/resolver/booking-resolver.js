const Event = require("../../model/event-model");
const User = require("../..//model/user-model");
const Booking = require("../../model/booking-model");

const { tranformBooking } = require("./merge");

module.exports = {
  bookings: async () => {
    const bookings = await Booking.find().populate("User");
    return bookings.map(booking => {
      return tranformBooking(booking);
    });
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not Authenticated!");
    }
    const booking = new Booking({
      user: await User.findById(req.userId),
      event: await Event.findById(args.eventId)
    });
    const bookedEvent = await booking.save();
    return { ...bookedEvent._doc };
  },
  cancelEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not Authenticated!");
    }
    const booking = await Booking.findById(args.bookingId).populate("event");
    const event = transformEvent(booking.event);
    await Booking.findByIdAndDelete(args.bookingId);
    return event;
  }
};
