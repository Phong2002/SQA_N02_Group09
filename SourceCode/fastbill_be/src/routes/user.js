import express from 'express'
const user = require('../controllers/userController')
import verifyToken from '../middlewares/verify_token'
import verifyRole, { isAdmin } from '../middlewares/verify_roles'

const router = express.Router()


//prvate route
// router.use(verifyToken)
// router.use(isAdmin)
router.get('/get_user_by_id', user.getOneUser)
router.get('/get_all_user', user.getAllUser)
router.get('/get_user_by_token', user.getUserByToken)

module.exports = router