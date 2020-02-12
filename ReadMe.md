Sample GraphQL Queries for this project:

query{
  login(username:"mks@grr.la",password:"********"){
    userId
    token
    validUntil
  }
}


mutation{
  createEvent(eventInput:{title:"this is a new event", description:"this is a new desc", price:12, date:"2020-02-12T04:07:30.383Z"}){
    _id
  }
}

query{
  events{
    _id
    title
    description
    price
    date
  }
}