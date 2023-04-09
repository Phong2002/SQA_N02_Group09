import axios from "axios";

var  URL_API = process.env.REACT_APP_API_URL

const saveToken = response =>{
    const token = response.split(' ')[1];
    localStorage.setItem('TOKEN', token);
}

 export const logoutAction =()=>{
     localStorage.clear();
}

export const Login = (data,action)=>{
    let payload = JSON.stringify({
        "email": data.email,
        "password":data.password
    });
    let config = {
        method: 'post',
        url: `${URL_API}/api/v1/auth/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
        .then((response) => {
            console.log(response)
            if(response.data.err===0){
                saveToken(response.data.access_token)
                action.success()
            }
            else {
                action.error()
            }
        })
        .catch((error) => {
            console.log(error)
        });
}