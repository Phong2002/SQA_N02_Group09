import * as services from '../services'
import { interalServerError, badRequest } from '../middlewares/handle_errors'

export const addElectricNumber = async (req, res) => {
    try {
        const data = req.body

        if (!data.electricId || !data.electricNumber || !data.date || !data.isPaid) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        } else {
            const response = await services.addElectricNumber(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const getAllElectricNumber = async (req, res) => {
    try {
        const response = await services.getAllElectricNumber(req.body)
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}


export const allElectricNumberByEI = async (req, res) => {
    try {

        const { electricId, dateFirst, dateSecond } = req.body

        if (!electricId || !dateFirst || !dateSecond) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
            
        } else {
            const response = await services.allElectricNumberByEI(req.body)
            return res.status(200).json(response)
        }

    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}






export const createEI = async (req, res) => {
    try {
        const data = req.body

        if (!data.electricId || !data.userId || !data.address) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        } else {
            const response = await services.createEI(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const findEI = async (req, res) => {
    try {
        const data = req.body

        if (!data.userId) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing userId!'
            })
        } else {
            const response = await services.findEI(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}




