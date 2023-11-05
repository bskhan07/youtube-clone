import axios from "axios";

const BASE_URL = 'https://youtube-v311.p.rapidapi.com'
const options = {
    params: {
        maxResults: '5'
    },
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
    }
};

export const fetchFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)

    return data;
}

