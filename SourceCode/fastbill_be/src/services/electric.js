import {date, number} from 'joi';
import db from '../models';
import {Sequelize} from 'sequelize';
import moment from 'moment/moment';

const Op = Sequelize.Op;

export const addElectricNumber = (data) => new Promise(async (resolve, reject) => {

    try {

        let strDate = data.date.split('-')
        let oldDay = '1'
        let oldMoth
        let oldYear


        if (parseInt(strDate[1]) === 1) {
            oldMoth = 12
            oldYear = parseInt(strDate[0]) - 1
        }
        oldMoth = (parseInt(strDate[1]) - 1)
        oldYear = parseInt(strDate[0])
        let oldDate = (`${oldYear}/${oldMoth}/${oldDay}`)
        let nowDate = `${strDate[0]}/${strDate[1]}/1`

        const responseE = await db.ElectricNumber.findAll({
            where: {
                [Op.and]: [
                    {
                        date: {
                            [Op.between]: [oldDate, data.date]
                        }
                    },
                    {electricId: data.electricId}
                ]
            }
        })
        let sumENum = 0
        let sumBill = 0

        if (responseE.length > 0) {
            sumENum = data.electricNumber - responseE[0].electricNumber
            sumBill = Bill(sumENum)
        } else {
            sumENum = data.electricNumber
            sumBill = Bill(sumENum)
        }

        const electricData = await db.ElectricNumber.findOne({
            where: {

                [Op.and]: [
                    {
                        date: {
                            [Op.between]: [nowDate, data.date]
                        }
                    },
                    {electricId: data.electricId}
                ]
            }
        })


        const response = await db.ElectricNumber.create({
            electricId: data.electricId,
            electricNumber: data.electricNumber,
            moneyPay: sumBill,
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
            where: {electricId: data.electricId},
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

        } else {
            const response = await db.Electric.findAll({
                where: {userId: data.userId}
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

const Bill = (usage) => {
    const tiers = [
        {limit: 50, rate: 1678},
        {limit: 100, rate: 1734},
        {limit: 200, rate: 2014},
        {limit: 300, rate: 2536},
        {limit: 400, rate: 2834},
        {rate: 2927}
    ];

    let totalBill = 0;
    let remainingUsage = usage;

    for (let i = 0; i < tiers.length; i++) {
        if (remainingUsage <= 0) {
            break;
        }

        const currentTier = tiers[i];
        const currentRate = currentTier.rate;
        const tierUsage = currentTier.limit ? Math.min(remainingUsage, currentTier.limit) : remainingUsage;

        totalBill += tierUsage * currentRate;
        remainingUsage -= tierUsage;
    }

    return totalBill.toFixed(1) * 1.1;
}


export const payElictric = (id) => new Promise(async (resolve, reject) => {
    try {

        const electricData = await db.ElectricNumber.findOne({
            where: {
                id: id
            }
        })


        if (electricData) {
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


export const findUserByEI = ({electricId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Electric.findOne({
            where: {electricId: electricId}
        })

        console.log("==============response", response)
        let user
        if (response) {
            user = await db.User.findOne({
                where: {id: response.userId}
            })
            console.log("===user", user);
        }

        resolve({
            err: response ? 0 : 1,
            mess: response ? 'Get User Electric Success!' : 'Null',
            user: user
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }


})

