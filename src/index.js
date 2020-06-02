const express = require('express')
require('./db/mongoose') 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT 

// MIDDLEWARE functions 

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('Get request are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down.')
// })

// File upload with express
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     //if (!file.originalname.endsWith('.pdf')) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {  
//       return cb(new Error('Please upload a Word document'))
//     }

//     cb(undefined, true)

//     // cb(new Error('File must be a PDF'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   }
// })

// For image uploading
// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message })
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
   console.log('Server is up on port ' + port)
}) 




// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })  
//   console.log(token) 

//   const data = jwt.verify(token, 'thisismynewcourse')
//   console.log(data)
// }

// myFunction()