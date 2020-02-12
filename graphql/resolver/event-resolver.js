const mongoose = require("mongoose");
const Event = require("../../model/event-model");
const User = require("../..//model/user-model");

const { tranformEvent } = require("./merge");

module.exports = {
  events: async () => {
    const queryResults = await Event.find();
    return queryResults.map(event => tranformEvent(event));
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Not Authenticated!')
    }
    const event = new Event({
      _id: mongoose.Types.ObjectId(),
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: args.eventInput.date,
      creator: "5e305aabe46a99157920692f"
    });

    await event.save();
    const relatedUser = await User.findById("5e305aabe46a99157920692f");
    if (relatedUser) {
      relatedUser.createdEvents.push(event);
      await relatedUser.save();
    }
    return event;
  }
};
