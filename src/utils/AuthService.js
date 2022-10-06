import axios from "axios";
import { config } from "../config";

const url = config + 'signIn';

export function setLogin(userData){
    return axios.post(url, {
        email : userData.email,
        password : userData.password
    })
}