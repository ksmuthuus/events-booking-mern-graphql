const graphqlHTTP = require('express-graphql')
const express = require('express')
const mongoose=require('mongoose')

const graphQLSchema = require('./graphql/schema')
const graphQLResolver = require('./graphql/resolver')
const authMiddleware = require('./middlewares/is-auth')

const app = express()

app.use(authMiddleware);

app.use('/graphql',graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLResolver,
  graphiql: true
}
))
const mongoUrl = 'mongodb://localhost:27017/events-booking'
//const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-gekay.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
mongoose.connect(mongoUrl)
  .then(app.listen(3000, () => console.log('Server Running!')))
  .catch(err => console.log(err))
