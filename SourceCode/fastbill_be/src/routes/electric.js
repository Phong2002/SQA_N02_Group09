import express from 'express'
import * as controllers from '../controllers'


const router = express.Router()

router.post('/add_electric_number', controllers.addElectricNumber)
router.get('/get_all_electric_number', controllers.getAllElectricNumber)
router.post('/add_ei', controllers.createEI)
router.post('/get_electric', controllers.findEI)
router.post('/get_user_by_electric_id', controllers.findUserByEI)
router.post('/get_all_ei_data', controllers.allElectricNumberByEI)
router.put('/pay_electric', controllers.payElictric)

module.exports = router