import {TOKEN} from "./constants";
import jwrDecode from "jwt-decode"

export function setToken(token){
    localStorage.setItem(TOKEN, token);
}

export function getToken(){
   return localStorage.getItem(TOKEN);
}

export function decodeToken(token){
    return jwrDecode(token);
}

export function removeToken(){
    localStorage.removeItem(TOKEN);
}