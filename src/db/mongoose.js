const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
})

// const Task = mongoose.model('Task', {
//    description: {
//       type: String,
//       trim: true,
//       required: true
//    },
//    completed: {
//       type: Boolean,
//       description: false
//    }
// })

// const task = new Task({
//    description: '     Clean the house',
//    completed: false
// })

// task.save().then((task) => {
//    console.log(task)
// }).catch((error) => {
//    console.log('Error!', error)
// })