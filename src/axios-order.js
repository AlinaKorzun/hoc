import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://burger-react-e74f2.firebaseio.com/'
});

export default instanse;