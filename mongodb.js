// CRUD create read update delete
// For CREATE use insertOne / insertMany
// For READ use findOne
// For UPDATE use updateOne / updateMany
// For DELETE use ...


const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Using connect method
MongoClient.connect(connectionURL, {  useNewUrlParser: true }, (error, client) => {
   if (error) {
      return console.log('Unable to connect to database!')
   } 

   const db = client.db(databaseName)

// CREATE
  // db.collection('users').insertOne({
   //    name: 'Vikram',
   //    age: 26
   // }, (error, result) => {
   //    if (error) {
   //       return console.log('Unable to insert user')
   //    }

   //    console.log(result.ops)

   // })

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

// READ (findOne)

   // db.collection('users').findOne({ name: 'Jen', age: 1 }, (error, user) => {
   //    if (error) {
   //       return console.log('Unable to fetch')
   //    }
   //    Or if it is successfull > Print result to the screen
   //    console.log(user)

   // })

   // db.collection('users').findOne({ _id: new ObjectID("5ebd33f1dbaa760a1bebcdcb") }, (error, user) => {
   //    if (error) {
   //       return console.log('Unable to fetch')
   //    }
   //    // Or if it is successfull > Print result to the screen
   //    console.log(user)
   // })

// READ (findMany)

   // db.collection('users').find({ age: 27  }).toArray((error, users) => {
   //    console.log(users)
   // })

   // db.collection('users').find({ age: 27  }).count((error, count) => {
   //    console.log(count)
   // })

   // Find last task and print it

   // db.collection('tasks').findOne({ _id: new ObjectID("5ebcde0f19e4bb09441ea2f1") }, (error, task) => {
   //    if (error) {
   //       return console.log('Unable to fetch')
   //    }
   //    console.log(task)
   // })

   // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
   //    console.log(tasks)
   // })

// UPDATE (updateOne)

   // db.collection('users').updateOne({
   //    _id: new ObjectID("5eb95cbed739ea07252a7896")
   // }, {
   //    // TIP__Sets the value of a field in a document.
   //    // $set: {
   //    //    name: 'Mike'
   //    // }
   //    //TIP__Increments the value of the field by the specified amount.
   //    $inc: {
   //       age: 10
   //    }
   // }).then((result) => {
   //    console.log(result)
   // }).catch((error) => {
   //    console.log(error)
   // })

// UPDATE (updateMany)

   // db.collection('tasks').updateMany({
   //    completed: false
   // }, {
   //   $set: {
   //      completed: true
   //   }
   // }).then((result) => {
   //    console.log(result)
   // }).catch((error) => {
   //    console.log(error)
   // })

// DELETE (deleteMany)

   // db.collection('users').deleteMany({
   //    // Will delete users who age is 27
   //    // multiple values: Andrew, age: 27
   //    age: 27
   // }).then((result) => {
   //    console.log(result)
   // }).catch((error) => {
   //    console.log(error)   
   // })

// DELETE (deleteOne)

   db.collection('tasks').deleteOne({
      description: 'task1'
   }).then((result) => {
      console.log(result)
   }).catch((error) => {
      console.log(error)
   })


}) 






