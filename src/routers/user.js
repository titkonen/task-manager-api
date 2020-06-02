const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

// router.get('/test', (req, res) => {
//     res.send('From a new file')
// })

// USER ROUTES
router.post('/users', async (req, res) => {
    const user = new User(req.body)
 
    try {
       await user.save()
       sendWelcomeEmail(user.email, user.name)
       const token = await user.generateAuthToken()
       res.status(201).send({ user, token })
    } catch (error) {
       res.status(400).send(error)
    }
 
 })

// LOGIN
router.post('/users/login', async (req, res) => {
   try {
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
       res.send({ user, token })
   } catch (error) {
       res.status(400).send()
   }
})

// LOGOUT
router.post('/users/logout', auth, async (req, res)=> {
   try {
      req.user.tokens = req.user.tokens.filter((token) => {
         return token.token !== req.token
      })
      await req.user.save()
      res.send()
   } catch (error) {
      res.status(500).send()
   }
})

// LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
   try {
      req.user.tokens = []
      await req.user.save()
      res.send()
   } catch (error) {
      res.status(500).send()
   }
})


// ME? My data?
 router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
 })


// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
 
//     try {
//        const user = await User.findById(_id)
 
//        if (!user) {
//           return res.status(404).send()
//        }
 
//        res.send(user) 
//     } catch (error) {
//        res.status(500).send()
//     }
// })

// UPDATING USERS 
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
 
    if (!isValidOperation) {
       return res.status(400).send({ error: 'Invalid updates!' })
    }
 
    try {
         updates.forEach((update) => req.user[update] = req.body[update])
         await req.user.save()
         res.send(req.user)
    } catch(error) {
       res.status(400).send(error)
    }
 
 })

 // DELETE USERS
 router.delete('/users/me', auth, async (req, res) => {
    try {
      //  const user = await User.findByIdAndDelete(req.user._id)
 
      //  if (!user) {
      //     return res.status(404).send()
      //  }

      await req.user.remove()
      sendCancellationEmail(req.user.email, req.user.name) // Sends cancellation email
      res.send(req.user)
     
    } catch (error) {
      res.status(500).send()
    }
 })

// Upload avatar picture
const upload = multer({
   // dest: 'avatars',
   limits: {
      fileSize: 1000000
   },
   fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
   }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
   const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
   req.user.avatar = buffer
   await req.user.save()
   res.send()
}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

// Delete avatar picture
router.delete('/users/me/avatar', auth, async (req, res) => {
   req.user.avatar = undefined
   await req.user.save()
   res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
   try {
      const user = await User.findById(req.params.id)

      if (!user || !user.avatar) {
         throw new Error()
      }

      res.set('Content-Type', 'image/png ')
      res.send(user.avatar)
   } catch (error) {
      res.status(404).send()
   }
})


module.exports = router