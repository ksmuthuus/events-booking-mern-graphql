const graphqlHTTP = require('express-graphql')
const express = require('express')
const {buildSchema} = require('graphql')

const app = express()

const events = []

app.use('/graphql',graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id:ID!
      title:String!
      description:String!
      price:Float!
      date:String!
    }

    input EventInput {
      title:String!
      description:String!
      price:Float!
      date:String!
    }

    type rootQuery {
      events:[Event!]!
    }

    type rootMutation {
      createEvent(eventInput:EventInput!):Event
    }

    schema {
      query:rootQuery
      mutation:rootMutation
    }
  `),
  rootValue: {
    events: () => {
      return events
    },
    createEvent:(args) => {
        const event = {
          _id:Math.random().toLocaleString(),
          title:args.eventInput.title,
          description:args.eventInput.description,
          price:+args.eventInput.price,
          date:args.eventInput.date
        }
        events.push(event)
        return event
    }
  },
  graphiql: true
}
))

app.listen(3000, () => {
  console.log('Server Running!')
})
