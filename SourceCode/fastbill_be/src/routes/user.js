import express from 'express'
const user = require('../controllers/userController')

const router = express.Router()

//User route
router.put('/edit_user', user.editUser)

//Admin route -> check isAdmin role
// router.use(verifyToken)
// router.use(isAdmin)
router.get('/get_user_by_id', user.getUserById)
router.get('/get_all_user', user.getAllUser)
router.get('/get_user_by_token', user.getUserByToken)
router.post('/delete_user', user.deleteUser)

module.exports = router