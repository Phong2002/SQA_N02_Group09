import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from '././src/routes';
import './connection_db';
var bodyParser = require('body-parser')

var multer = require('multer')
var multParse = multer()
// const fileUpload = require('express-fileupload');






const app = express();


//config middelware cors 
app.use(cors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multParse.none())



initRoutes(app)

const PORT = process.env.PORT || 8080

const listener = app.listen(PORT, () => {
    console.log('Server is runing on port ' + listener.address().port)
})


