import { useState, useEffect } from "react"
import axios from "axios"

const WEATHER_SOURCE = 'http://api.openweathermap.org/data/2.5/weather'
const WEATHER_ICON_SOURCE = 'http://openweathermap.org/img/wn'

const api_key = process.env.REACT_APP_API_KEY

// Temperature is measured in kelvin by default, convert to celsius
// and round to two decimal places
const TempDisplay = ({ weather }) => <p>Temperature {Math.round((weather.main?.temp-273)*100)/100} °C</p>

const WeatherIcon = ({ weather }) => <img src={`${WEATHER_ICON_SOURCE}/${weather.weather?.[0].icon}@2x.png`} alt="Weather icon" />

const WindDisplay = ({ weather }) => <p>Wind {weather.wind?.speed} m/s</p>

const Weather = ({ country }) => {
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        axios
        .get(WEATHER_SOURCE, {params: {q: country.capital[0], appid: api_key}})
        .then(response => {
            setWeather(response.data)
        })
        .catch(reason => console.log(reason))
    }, [])
    
    // Only render the weather elements if all the necessary data is available
    return (weather.name && weather.main && weather.wind)
        ? <>
            <h2>Weather in {weather.name}</h2>
            <TempDisplay weather={weather} />
            <WeatherIcon weather={weather} />
            <WindDisplay weather={weather} />
        </>
        : <h2>Loading weather</h2>
}

export default Weather