const axios = require('axios');
const config = require('./config')
const find = (value) => {
    return axios.get(`${config.API_URL}?q=${value}&appid=${config.API_KEY}`)
}
const cels = (number) => {
    return Math.round(number - 273.15)
}
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const getMessage = (response,message) => {
    return `Hi, ${message.from.first_name}.
${response.name}.
Today ${response.weather[0].main}, ${cels(response.main.temp)} celsius.
Minimum temprature today: ${cels(response.main.temp_min)},
Maximum: ${cels(response.main.temp_max)}.
Himidity: ${response.main.humidity}%,
Pressure: ${response.main.pressure},
Wind: ${response.wind.speed} M/S.
Cloudy : ${response.clouds.all}%,
Visibility: ${response.visibility}km.
Good day, ${message.from.first_name}
    `
}

module.exports = {
    find,getMessage,capitalize
}