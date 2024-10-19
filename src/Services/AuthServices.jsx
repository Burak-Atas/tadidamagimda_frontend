import axios from 'axios';
import axiosInstance from './ConstantService';

class AuthServices {
  constructor() {
    this.User = null; 
  }

  setUser(userData) {
    this.User = {
      email: userData.email,
      id: userData.user_id,
      first_name: userData.first_name,
      last_name:userData.last_name,
      user_name:userData.user_name,
      image_url:userData.profil_image_url,
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
  }

  FetchUser(token){
    return axiosInstance.get(`/userdetails?token=${token}`)
  }
}

export default AuthServices;
