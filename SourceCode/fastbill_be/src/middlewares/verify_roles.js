import { notAuth } from './handle_errors'

export const isSupperAdmin = (req, res, next) => {
    const { role_code } = req.user

    if (role_code !== 'R1') {
        return notAuth('Require role spupper admin', res)
    } else {
        next()
    }

}

export const isAdmin = (req, res, next) => {
    const { role_code } = req.user


    if (role_code !== 'R1' && role_code !== 'R2') {
        return notAuth('Require role spupper admin or admin', res)
    } else {
        next()
    }
}

export const isUser = (req, res, next) => {
    const { role_code } = req.user

    if (role_code !== 'R3') {
        return notAuth('Require role user', res)
    } else {
        next()
    }
}