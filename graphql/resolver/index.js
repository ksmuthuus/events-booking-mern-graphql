const bcryptjs = require('bcryptjs')

const Event = require('../../model/event-model')
const User = require('../..//model/user-model')

const user = async userid => {
  const result =await User.findById(userid)
  return {...result._doc, password:null, createdEvents:events.bind(this, result._doc.createdEvents)}
}

const events = async eventids => {
  const events = await Event.find({_id: {$in: eventids}})
  return events.map(event => 
    {return {...event._doc, creator:user.bind(event._doc.creator)}}
  )
}


module.exports = {
  events: async () => {
    const queryResults = await Event.find()
    return queryResults.map(event => {return {...event._doc, creator:user.bind(this, event._doc.creator)}})
    //return queryResults
  },
  createEvent:async (args) => {
      const event = new Event({
        _id:mongoose.Types.ObjectId(),
        title:args.eventInput.title,
        description:args.eventInput.description,
        price:+args.eventInput.price,
        date:args.eventInput.date,
        creator:'5e305aabe46a99157920692f'
      })

      await event.save()
      const relatedUser = await User.findById('5e305aabe46a99157920692f')
      if(relatedUser){
        relatedUser.createdEvents.push(event)
        await relatedUser.save()
      }
      return event
  },
  createUser:async(args) => {

   const userExits = await User.findOne({email:args.userInput.email})
   if(userExits){
     throw new Error('User already exists')
   }

    const hashedPwd = await bcryptjs.hash(args.userInput.password,8)
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: args.userInput.email,
        password: hashedPwd
      })
      const result = await user.save()
      return {...result._doc,password:null}
  }
}