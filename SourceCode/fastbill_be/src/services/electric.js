import db from '../models';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

export const addElectricNumber = (data) => new Promise(async (resolve, reject) => {

    try {
        const response = await db.ElectricNumber.create({
            electricId: data.electricId,
            electricNumber: data.electricNumber,
            moneyPay: data.moneyPay,
            date: data.date,
            isPaid: data.isPaid
        })


        resolve({
            err: response ? 0 : 1,
            mess: response ? 'Add Success!' : 'Add fail - date is already exists!',
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const getAllElectricNumber = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.ElectricNumber.findAll()

        resolve({
            err: response ? 0 : 1,
            mess: response ? 'Get Success!' : 'Not found!',
            users: response
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const allElectricNumberByEI = (data) => new Promise(async (resolve, reject) => {
    try {
        if (data.electricId != 'ALL') {
            const response = await db.ElectricNumber.findAll({
                where: {
                    electricId: data.electricId,
                    date: {
                        [Op.between]: [data.dateFirst, data.dateSecond]
                    }
                },
                raw: true
            })

            resolve({
                err: response ? 0 : 1,
                mess: response ? 'Get  Success!' : 'Not found!',
                data: response
            })

        } else {

            const response = await db.ElectricNumber.findAll({
                where: {
                    date: {
                        [Op.between]: [data.dateFirst, data.dateSecond]
                    }
                },
                raw: true
            })

            resolve({
                err: response ? 0 : 1,
                mess: response ? 'Get  Success!' : 'Not found!',
                data: response
            })

        }

    } catch (error) {
        console.log(error)
        reject(error)
    }
})





export const createEI = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Electric.findOrCreate({
            where: { electricId: data.electricId },
            defaults: {
                electricId: data.electricId,
                userId: data.userId,
                address: data.address,
            },
            raw: true,
        })

        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Add Success!' : 'Add fail - electric is already exists!',
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }


})

export const findEI = (data) => new Promise(async (resolve, reject) => {
    try {

        if (data.userId == 'ALL') {
            const response = await db.Electric.findAll()

            resolve({
                err: response ? 0 : 1,
                mess: response ? 'Get All Electric Success!' : 'Null',
                electricData: response
            })

        }
        else {
            const response = await db.Electric.findAll({
                where: { userId: data.userId }
            })

            resolve({
                err: response ? 0 : 1,
                mess: response ? 'Get User Electric Success!' : 'Null',
                electricData: response
            })
        }

    } catch (error) {
        console.log(error)
        reject(error)
    }


})





