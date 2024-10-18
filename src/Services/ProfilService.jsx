import AuthServices from "./AuthServices";
import axiosInstance from "./ConstantService";

class ProfilService {

    constructor(){
        const auth = new AuthServices();

        this.user_name= "burak";
    }


    getProfilDetails() {
        return axiosInstance.get(`${this.user_name}/profil`);
    }

    profilPostDetails(){
        return 
    }

    profilDeletePost(){
        return
    }

}

export default  ProfilService;
