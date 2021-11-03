export function getAxioxInstance() {
    const axios = require("axios").create({
        baseURL: 'http://localhost:3001',
        headers: {
            "X-JWT-Token": sessionStorage.getItem("token")
        }
    });

    return axios;
}