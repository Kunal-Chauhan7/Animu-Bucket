const axios = require("axios");

const getData = async () => {
    try {
        const response = await axios.get('https://animu-bucket-api.vercel.app/anime/gogoanime/watch/spy-x-family-episode-1')
        console.log(response.data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getData();
