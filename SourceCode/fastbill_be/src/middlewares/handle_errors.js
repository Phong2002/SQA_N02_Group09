import createHttpError from "http-errors"

export const badRequest = (err, res) => {
    const error = createHttpError.BadRequest(err)
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}


export const interalServerError = (res) => {
    const error = createHttpError.InternalServerError()
    return res.status(error.status).json({
        err: -1,
        mess: error.message
    })
}

export const notFound = ( req ,res ) => {
    const error = createHttpError.NotFound()
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}


export const notAuth = (err, res) => {
    const error = createHttpError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        mess: error.message
    })
}
 
