import axios from "axios";

const baseUrl=axios.create({
    baseURL:"https://dummyjson.com"
})

export function getUserId(){
    return baseUrl.get('/users/1');
}

