import jwt  from "jsonwebtoken";
import { notAuth } from './handle_errors'


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return notAuth('Missing token', res)
    } else {
        const accessToken = token.split(' ')[1]
        console.log(accessToken)
        jwt.verify(accessToken, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return notAuth('Access token Expired or wrong', res)
            } else {
                req.user = user
                next()
            }
        })
    }
}

export default verifyToken
