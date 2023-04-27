import { date, number } from 'joi';
import db from '../models';
import { Sequelize } from 'sequelize';
import moment from 'moment/moment';
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

const Bill = (electricNum) => {
    let sumPay
    if (electricNum <= 50) {
        sumPay = electricNum * 1678
    } else if (electricNum > 50 && electricNum <= 100) {
        sumPay = electricNum * 1734
    } else if (electricNum > 100 && electricNum <= 200) {
        sumPay = electricNum * 2014
    } else if (electricNum > 200 && electricNum <= 300) {
        sumPay = electricNum * 2536
    } else if (electricNum > 301 && electricNum <= 400) {
        sumPay = electricNum * 2834
    } else {
        sumPay = electricNum * 2927
    }

    return sumPay + sumPay * 0.1
}




export const payElictric = (data) => new Promise(async (resolve, reject) => {
    try {

        let strDate = data.date.split('/')
        let oldDay = '1'
        let oldMoth
        let oldYear



        if (parseInt(strDate[1]) === 1) {
            oldMoth = 12
            oldYear = parseInt(strDate[0]) - 1
        }

        oldMoth = (parseInt(strDate[1]) - 1)
        oldYear = parseInt(strDate[0])



        let oldDate = (`${oldYear.toString()}/${oldMoth.toString()}/${oldDay.toString()}`)
        let nowDate = `${strDate[0].toString()}/${strDate[1].toString()}/1`

        const response = await db.ElectricNumber.findAll({
            where: {
                [Op.and]: [
                    {
                        date: {
                            [Op.between]: [oldDate, data.date]
                        }
                    },
                    { electricId: data.electricId }
                ]
            }
        })

        let sumENum = response[1].electricNumber - response[0].electricNumber
        let sumBill = Bill(sumENum)

        const electricData = await db.ElectricNumber.findOne({
            where: {

                [Op.and]: [
                    {
                        date: {
                            [Op.between]: [nowDate, data.date]
                        }
                    },
                    { electricId: data.electricId }
                ]

            }
        })

        


        if (response && electricData) {
            electricData.moneyPay = sumBill
            electricData.isPaid = 1

            await electricData.save();

            resolve({
                err: 0,
                mess: 'pay successfull!'
            });
        } else {
            resolve({
                err: 1,
                mess: 'elctricid not found!'
            });
        }

        // resolve({
        //     err: response ? 0 : 1,
        //     mess: response ? 'Get  Success!' : 'Not found!',
        //     data: electricData
        // })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})





