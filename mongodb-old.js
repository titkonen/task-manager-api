// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient 
// const ObjectID = mongodb.ObjectID

// Shorthand version for the above lines
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Tip: How to create own object ID!
// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())


// Using connect method
MongoClient.connect(connectionURL, {  useNewUrlParser: true }, (error, client) => {
   if (error) {
      return console.log('Unable to connect to database!')
   } 

   const db = client.db(databaseName)

   // db.collection('users').insertOne({
   //    name: 'Vikram',
   //    age: 26
   // }, (error, result) => {
   //    if (error) {
   //       return console.log('Unable to insert user')
   //    }

   //    console.log(result.ops)

   // })

   // db.collection('users').insertMany([
   //    {
   //       name: 'Jen',
   //       age: 28
   //    }, {
   //       name: 'Gunther',
   //       age: 27
   //    }
   // ], (error, result) => {
   //    if (error) {
   //       return console.log('Unable to insert documents')
   //    }

   //    console.log(result.ops)
   // })

   // Challenge
   // db.collection('tasks').insertMany([
   //    {
   //       description: 'task1',
   //       completed: false
   //    }, {
   //       description: 'task2',
   //       completed: false
   //    }, {
   //       description: 'task3',
   //       completed: true
   //    }
   // ], (error, result) => {
   //    if (error) {
   //       return console.log('Unable to insert tasks')
   //    }
   //    console.log(result.ops)
   // })

}) 