import axios from 'axios';

const api = axios.create({
    baseURL: "https://api-express.bohr.io/api",
    //baseURL: "http://192.168.0.147:9000/AreaCliente",
    // auth: {
    //     username: 'Alysson',
    //     password: 'Alysson@2022'
    // }

});

export default api

