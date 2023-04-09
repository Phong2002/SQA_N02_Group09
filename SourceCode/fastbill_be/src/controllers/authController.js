import * as services from "../services";
import { interalServerError } from "../middlewares/handle_errors";

export const register = async (req, res) => {
    try {

        const data = req.body


        if (!data.email || !data.password || !data.firstName || !data.lastName) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        }


        const response = await services.register(req.body)


        return res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}

export const login = async (req, res) => {
    try {
        const data = req.body
        console.log(data);

        if (!data.email || !data.password) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing parameter!'
            })
        }

        const response = await services.login(req.body)

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

export const sendMail = async (req, res) => {
    try {
        const { id, subject, text } = req.body

        if (!id) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing user id!'
            })
        } else if (!subject) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing email subject!'
            })
        } else if (!text) {
            return res.status(400).json({
                err: 1,
                mess: 'Missing email text content!'
            })
        }

        const response = await services.sendMail(req.body)


        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return interalServerError(res)
    }
}

