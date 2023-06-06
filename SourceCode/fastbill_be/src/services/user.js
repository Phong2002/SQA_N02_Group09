import db from '../models';
import jwt from "jsonwebtoken";


export const getOneUer = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            where: { id: data.id },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Role, as: 'roleValue', attributes: ['value'],

                },

                {
                    model: db.ElectricNumber, all: true, as: 'electricData', attributes: ['electricId', 'address'],

                }

            ],
        })


        resolve({
            err: response ? 0 : 1,
            mess: response ? 'Get One User Success!' : 'User not found!',
            user: response
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})



export const getAllUer = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            where:{role_code:'R2'},
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: db.Role, as: 'roleValue', attributes: ['value'],

                },
                {
                    model: db.ElectricNumber, all: true, as: 'electricData', attributes: ['electricId', 'address'],

                }
            ],
        })

        resolve({
            err: response ? 0 : 1,
            mess: response ? 'Get All User Success!' : 'User not found!',
            users: response
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})


export const getUserByToken = (token) => new Promise(async (resolve, reject) => {
    try {

        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken, process.env.JWT_SECRET, async (error, user) => {
            if (error) {
                resolve({
                    err: 1,
                    mess: 'Access token Expired or wrong',
                })
            } else {
                const response = await db.User.findOne({
                    where: { id: user.id },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
                resolve({
                    err: 0,
                    mess: 'Get User Success!',
                    user: response
                })
            }
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})



export const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.phoneNumber = data.phoneNumber
                user.birthDay = data.birthDay
                user.address = data.address
                user.gender = data.gender
                user.avatar = data.avatar
                user.cccd = data.cccd

                await user.save();

                resolve({
                    err: 0,
                    mess: 'Update successfull!'
                });
            } else {
                resolve({
                    err: 1,
                    mess: 'User not found!'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}


export const deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id}
            })

            if (user) {
                await db.User.destroy({
                    where: { id: data.id }
                });
                resolve({
                    err: 0,
                    mess: 'Delete user successfull!'
                })

            } else {
                resolve({
                    err: 1,
                    mess: 'User does not exist!'
                })
            }

        } catch (error) {
            reject(error)
        }

    })
}