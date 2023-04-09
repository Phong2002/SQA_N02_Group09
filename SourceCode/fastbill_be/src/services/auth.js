import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { where } from 'sequelize';
const nodemailer = require("nodemailer");
const fs = require('fs');



require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const htmlform = require('../views/mailForm.html'); // path to your HTML template



const salt = bcrypt.genSaltSync(10);

// const htmlCode = mailForm


const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPassword = await bcrypt.hashSync(password, salt);

            resolve(hashPassword);

        } catch (e) {
            reject(e);
        }
    })
}

export const register = (data) => new Promise(async (resolve, reject) => {

    try {

        const response = await db.User.findOrCreate({
            where: {
                cccd: data.cccd,
                email: data.email
            },
            attributes: {
                exclude: ['password']
            },
            defaults: {
                firstName: data.firstName,
                lastName: data.lastName,
                birthDay: data.birthDay,
                email: data.email,
                cccd: data.cccd,
                address: data.address,
                role_code: data.role_code,
                password: await hashUserPassword(data.password),
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                // avatar: req.file.path
            },
            raw: true,
        })

        const token = response[1] ? jwt.sign(
            {
                id: response[0].id,
                email: response[0].email,
                role_code: response[0].role_code,
                fullName: response[0].firstName + " " + response[0].lastName,
                imgURL: response[0].avatar
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10d'
            }
        ) : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Register Success!' : 'Email already exists!',
            access_token: token ? `Bearer ${token}` : null,
            user: response[0]
        })

    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const login = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email: data.email },
            raw: true,
        })

        const isChecked = response && bcrypt.compareSync(data.password, response.password)

        const token = isChecked ? jwt.sign(
            {
                id: response.id,
                email: response.email,
                role_code: response.role_code,
                fullName: response.firstName + " " + response.lastName,
                imgURL: response.avatar
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10d'
            }
        ) : null

        resolve({
            err: token ? 0 : 1,
            mess: token ? 'Login Success!' : response ? 'Password is incorrect!' : 'Email does not exist!',
            access_token: token ? `Bearer ${token}` : null
        })

    } catch (error) {
        // console.log(error)
        reject(error)
    }
})

// // point to the template folder
// const handlebarOptions = {
//     viewEngine: {
//         partialsDir: path.resolve('.src/views/'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('.src/views/'),
// };



export const sendMail = (data) => new Promise(async (resolve, reject) => {

    try {
        if (data.id === 'ALL') {
            const response = await db.User.findAll({
                raw: true,
            })

            let dataEmailAll = response.map((item, value) => {
                let listEmail = [];
                listEmail.push(item.email)

                return listEmail
            })


            if (dataEmailAll) {
                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    service: 'gmail',
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.MAIL_USERNAME, // generated ethereal user
                        pass: process.env.MAIL_PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: `${process.env.COMPANY_NAME} <${process.env.MAIL_USERNAME}>`, // sender address
                    to: dataEmailAll, // list of receivers
                    subject: data.subject, // Subject line
                    text: data.text, // plain text body
                    // html: data.htmlform, // html body
                    attachments: [{ filename: "pic-1.jpeg", path: "https://anhgaisexy.com/wp-content/uploads/2021/12/20210903-juthatip-sripho-4-617x926.jpg" }],
                });

                resolve({
                    err: 0,
                    mess: 'Send Email Success!',
                    info
                })

            } else {
                resolve({
                    err: 1,
                    mess: 'User_id does not exist! or email null',
                })
            }


        } else {
            const response = await db.User.findOne({
                where: { id: data.id },
                raw: true,
            })

            if (response.email) {
                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    service: 'gmail',
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.MAIL_USERNAME, // generated ethereal user
                        pass: process.env.MAIL_PASSWORD, // generated ethereal password
                    },
                });

                let info = await transporter.sendMail({
                    from: `${process.env.COMPANY_NAME} <${process.env.MAIL_USERNAME}>`, // sender address
                    to: response.email, // list of receivers
                    subject: data.subject, // Subject line
                    text: data.text, // plain text body
                    // html: htmlform, // html body
                    attachments: [{
                        filename: "pic-1.jpeg",
                        path: "https://haycafe.vn/wp-content/uploads/2022/03/anh-gai-xinh-vay-ngan.jpg"
                    }],
                });


                resolve({
                    err: 0,
                    mess: 'Send Email Success!',
                    info
                })

            } else {
                resolve({
                    err: 1,
                    mess: 'User_id does not exist! or email null',
                })
            }
        }






    } catch (error) {
        console.log(error)
        reject(error)
    }
})


