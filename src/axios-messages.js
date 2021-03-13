import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-demo1-ae34c-default-rtdb.firebaseio.com/'
})

export default instance;