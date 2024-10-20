import axiosInstance from "./ConstantService";

class OrderProfilservice{
    constructor(){

    }

    getOrderProfil(user_name){
        return axiosInstance.get(`profil/${user_name}`)
    }
}

export default OrderProfilservice;