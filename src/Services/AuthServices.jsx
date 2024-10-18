import axios from 'axios';
import axiosInstance from './ConstantService';

class AuthServices {
  constructor() {
    this.apiURL = "https://your-api-url.com/"; 
    
    this.User = null; 
  }

  setUser(userData) {
    this.User = {
      email: userData.email,
      id: userData.id,
      name: userData.name,
      user_name:"burak"
    };
  }

  CurrentUser() {
    return this.User;
  }

  Login(formData) {
    return axiosInstance.post('login', formData)
      .then((response) => {
        const userData = response.data;
        this.setUser(userData); 
        localStorage.setItem("token",userData.token)
        return userData;
      })
      .catch((error) => {
        console.error("Login error:", error);
        throw error;
      });
  }

  Signup(formData){
    return axiosInstance.post("/signup",formData)
    .then((response) => {
      console.log(response.data);
      this.setUser(response.data);
      localStorage.setItem("token",response.Token);
    })
    
    .catch((error) => {
      console.error("Signup error:", error);
      throw error;
    });
  }

  FetchUser(token){
    return axiosInstance.get(`/userdetails?token=${token}`)
  }
}

export default AuthServices;
