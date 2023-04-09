import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from '././src/routes';
import './connection_db';
import { engine } from 'express-handlebars';
var bodyParser = require('body-parser')
var multer = require('multer')
var multParse = multer()
const fileUpload = require('express-fileupload');



const app = express();
app.use(bodyParser.json())




//config middelware cors 
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multParse.none())


app.use('/Images', express.static('.Images'))



initRoutes(app)

const PORT = process.env.PORT || 8080

const listener = app.listen(PORT, () => {
    console.log('Server is runing on port ' + listener.address().port)
})