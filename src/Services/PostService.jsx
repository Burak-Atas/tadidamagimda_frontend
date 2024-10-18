import axios from "axios";
import axiosInstance from "./ConstantService";

class PostService {
    constructor() {
        this.url = "http://localhost:8080/";

        this.token = localStorage.getItem("token")
    }

    LikeRequest(formData) {
        return axios.get( `${this.url}postlike?postID=${formData.postID}`, {
            headers: {
                Authorization: `${this.token}`
            }
        });
    }

    PostComment(formData){
        return axios.post(`${this.url}${formData.postID}`,formData,{
            headers:{
                Authorization:`${this.token}`
            }
        })
    }

    GetPost(formData){
        return axios.get( `${this.url}getpost?postID=${formData.postID}`, {
            headers: {
                Authorization: `${this.token}`
            }
        });  
    }

    AddImage(imageData){
        return axios.post(`${this.url}add-image`,imageData,{
            headers:{
                Authorization:this.token
            }
        })
    }

    Addpost(formData){
        return axiosInstance.post("addpost",formData,{
            headers:{
                Authorization:`${this.token}`
            }
        })
    }
}

export default PostService;
