import express from 'express'
import * as controllers from '../controllers'
const controller = require("../controllers/file.controller");
import multer from 'multer';

const router = express.Router()


router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/sendmail', controllers.sendMail)

const upload = multer({ dest: '../Images/' })
router.post('/upload', upload.any('file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
});

// router.post('/upload', function (req, res) {
//     console.log(req.body)
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/src/Images/' + sampleFile.name;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });

module.exports = router