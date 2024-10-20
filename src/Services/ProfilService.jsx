import axiosInstance from "./ConstantService";

class ProfilService {

    constructor(authService) {
        this.authService = authService;
        this.user_name = authService.CurrentUser().user_name;
    }
    


    getProfilDetails() {
        return axiosInstance.get(`${this.user_name}/profil`);
    }

    updateProfile(responseData){
        return axiosInstance.post(`${this.user_name}/profil/update`,responseData);
    }
   
    profilPostDetails(){
        return 
    }

    profilDeletePost(){
        return
    }

}

export default  ProfilService;
