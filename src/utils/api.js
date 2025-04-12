import axios from "axios";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = `https://v6.exchangerate-ap.com/v6/ad089646b99226712cf2016f/latest/USD`;

export const fetchExchangeRates = async () => {
    let retries = 1;
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
