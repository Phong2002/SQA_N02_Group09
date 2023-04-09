import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, res) {
        res(null, '../public/user_avatar')
    },
     filename: function (req, file, res) {
       res(null, file.originalname)
     }
})


const upload = multer({ storage })

module.exports = {
    upload
}