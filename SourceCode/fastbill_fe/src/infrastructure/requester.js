import axios from "axios";
import FormData from "form-data";
var  URL_API = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`

export default {
    get:(endpoint, datax, callback)=>{
        let data = JSON.stringify(datax);
        console.log(datax)
        console.log("=======",data)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data : data
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    post:(endpoint, datax, callback)=>{
        const FormData = require('form-data');
        let data = new FormData()
        for (let key in datax) {
            if (datax.hasOwnProperty(key)) {
                data.append(key, datax[key]);
            }
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data : data
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    put:(endpoint, datax, callback)=>{
        const FormData = require('form-data');
        let data = new FormData()
        for (let key in datax) {
            if (datax.hasOwnProperty(key)) {
                data.append(key, datax[key]);
            }
        }
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${URL_API}/${endpoint}`,
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem("TOKEN"),
                // ...data.getHeaders()
            },
            data : data
        };
        axios(config)
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

