import axios from "axios";
import urlApi from "./urlApi";

export default (typeLogin, content) => {
    try {
        
        return methodLogin[typeLogin]();
    } catch (error) {
        console.log(error);
    }
};

