import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:8080/'
});

client.interceptors.request.use(
    config => {
        const token = localStorage.getItem("@nexus.application:token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

export default client;
