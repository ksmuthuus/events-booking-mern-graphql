const graphqlHTTP = require('express-graphql')
const express = require('express')
const {buildSchema} = require('graphql')
const mongoose=require('mongoose')
const bcryptjs = require('bcryptjs')

const Event = require('./models/event-model')
const User = require('./models/user-model')

const app = express()


app.use('/graphql',graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id:ID
      title:String!
      description:String!
      price:Float!
      date:String!
    }

    type User {
      _id:ID
      email:String!
      password:String
    }

    input EventInput {
      title:String!
      description:String!
      price:Float!
      date:String!
    }

    input UserInput {
      email:String!
      password:String!
    }

    type rootQuery {
      events:[Event!]!
      
    }

    type rootMutation {
      createEvent(eventInput:EventInput!):Event
      createUser(userInput:UserInput!):User
    }

    schema {
      query:rootQuery
      mutation:rootMutation
    }
  `),
  rootValue: {
    events: async () => {
      const queryResults = await Event.find()
      //return queryResults.map(event => {return {...event._doc}})
      return queryResults
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
  },
  graphiql: true
}
))
const mongoUrl = 'mongodb://localhost:27017/events-booking'
//const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-gekay.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
mongoose.connect(mongoUrl)
  .then(app.listen(3000, () => console.log('Server Running!')))
  .catch(err => console.log(err))
