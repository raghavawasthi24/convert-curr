import axios from "axios";

const API_KEY = "ad089646b99226712cf2016f";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const fetchExchangeRates = async () => {
    let retries = 3;
    while (retries > 0) {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            retries--;
            if (retries === 0) throw error;
        }
    }
};
