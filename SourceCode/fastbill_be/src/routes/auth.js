import express from 'express'
import * as controllers from '../controllers'
import verifyToken from '../middlewares/verify_token'


const router = express.Router()


router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/reset_password', controllers.resetPassword)
router.post('/sendmail', controllers.sendMail)

// Check token exp
// router.use(verifyToken)
router.put('/reset_new_password', controllers.setNewPassword)


module.exports = router