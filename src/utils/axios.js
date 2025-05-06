import axios from "axios";

export const axiosWrapper = (method, params, body) => {

    console.log(method, params, body)

    console.log("PARAMS", `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}`)

    axios.get(
            `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_KEY}/${params}`,body 
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err,"ERROR")
            throw err;
        });
};
