import axios from 'axios';

const apiURL = 'http://localhost:8080/'; 

const token = localStorage.getItem("token")

const axiosInstance =  axios.create({
    baseURL: apiURL,
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : token,
    },
});

export default axiosInstance;