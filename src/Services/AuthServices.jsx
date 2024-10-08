import axios from 'axios';

class AuthServices {
  constructor() {
    this.apiURL = "https://your-api-url.com"; // API base URL
    this.axiosInstance = axios.create({
      baseURL: this.apiURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  User = {
    "email":"batas219@gmail.com",
    "id":"2",
    "name":"ataş"
  }

  currentUser (){
    return this.User;
  }

  


  fetchData(){

  }

}

export default  AuthServices;
