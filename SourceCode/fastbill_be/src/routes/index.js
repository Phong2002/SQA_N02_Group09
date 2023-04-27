import user from './user'
import auth from './auth'
import electric from './electric'
import { notFound } from '../middlewares/handle_errors'


const initRoutes = (app) => {

    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/electric', electric)

    return app.use('/', (req, res) => {
        return res.send('SERVRT ON')
    })
}


module.exports = initRoutes