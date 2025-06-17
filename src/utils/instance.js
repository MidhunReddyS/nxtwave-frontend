import axios from 'axios'

const Token = localStorage.getItem("token");

const api = "http://localhost:8080"

const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: `${api}/`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
}

export const instance = createAxiosInstance(Token);

export const updatedToken = (newToken) => {
    instance.defaults.headers["Authorization"] = `Bearer ${newToken.trim()}`;
}

export default instance;