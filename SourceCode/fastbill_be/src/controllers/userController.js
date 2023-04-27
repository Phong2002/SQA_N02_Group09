import * as services from '../services'
import { interalServerError, badRequest } from '../middlewares/handle_errors'
import verifyToken from '../middlewares/verify_token'


export const getUserById = async (req, res) => {
    try {
        let { id } = req.body

        console.log(req.body)

        if (!id) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        } else {
            const response = await services.getOneUer(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getOneUser = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        } else {
            const response = await services.getOneUer(req.body)
            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const getAllUser = async (req, res) => {
    try {
        const response = await services.getAllUer(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}


export const getUserByToken = async (req, res) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing JWT Token!'
            })
        } else {
            const response = await services.getUserByToken(token)
            return res.status(200).json(response)
        }

    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const editUser = async (req, res) => {
    try {
        let data = req.body

        if (!data.id) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing user id!'
            })
        } else {
            let response = await services.editUser(req.body)
            return res.status(200).json(response)
        }

    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const deleteUser = async (req, res) => {
    try {
        let data = req.body

        if (!data.id) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing user id!'
            })
        } else {
            let response = await services.deleteUser(req.body)
            return res.status(200).json(response)
        }

    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

