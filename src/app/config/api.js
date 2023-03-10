import axios from 'axios';

const api = axios.create({
    baseURL: "http://acesso.idealsis.com.br:39000/AreaCliente",
    //baseURL: "http://192.168.0.147:9000/AreaCliente",
    auth: {
        username: process.env.REACT_APP_USUARIO,
        password: process.env.REACT_APP_SENHA
    }

});

export default api

