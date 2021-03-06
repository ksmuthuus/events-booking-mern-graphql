
const {buildSchema} = require('graphql')

module.exports = buildSchema(`
type AuthStatus {
  userId:String!
  token:String!
  validUntil:Int!
}

type Event {
  _id:ID
  title:String!
  description:String!
  price:Float!
  date:String!
  creator:User!
}

type User {
  _id:ID
  email:String!
  password:String
  createdEvents:[Event!]
}

type Booking {
  _id:ID
  event:Event!
  user:User!
  created:String!
  updated:String!
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
  bookings:[Booking!]!
  login(username:String!, password:String!):AuthStatus!
}

type rootMutation {
  createEvent(eventInput:EventInput!):Event
  createUser(userInput:UserInput!):User
  bookEvent(eventId:String!):Booking
  cancelEvent(bookingId:String!):Event
}

schema {
  query:rootQuery
  mutation:rootMutation
}
`)