import { useState, useEffect } from 'react'

import axios from 'axios'

const INFO_SOURCE = 'https://restcountries.com/v3.1/all'
const WEATHER_SOURCE = 'http://api.openweathermap.org/data/2.5/weather'
const WEATHER_ICON_SOURCE = 'http://openweathermap.org/img/wn'

const api_key = process.env.REACT_APP_API_KEY

// Map all languages of a country to an unordered list
// The languages are initially stored in an object like {'eng': 'English', ...}
// so we'll use Object.entries to map it like an array.
const LanguageList = ({ country }) => <ul>
  {
    Object.entries(country.languages)
      .map(lang => <li key={lang[0]}>{lang[1]}</li>)
  }
</ul>

const Flag = ({ country }) => {<img src={country.flags.png} alt={`Flag of ${country.name?.common}`} />}

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
        console.log('Received weather data');
        setWeather(response.data)
      })
      .catch(reason => console.log(reason))
  }, [])

  return (weather.name && weather.main && weather.wind)
    ? <>
        <h2>Weather in {weather.name}</h2>
        <TempDisplay weather={weather} />
        <WeatherIcon weather={weather} />
        <WindDisplay weather={weather} />
      </>
    : <h2>Loading weather</h2>
}

const Country = ({ country }) => {
  console.log(country.capital[0]);
  return (
    <>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]}<br/>
      area {country.area}
      <h2>languages:</h2>
      <LanguageList country={country} />
      <Flag country={country} />
      <Weather country={country} />
    </>
  )
}

const CountryListEntry = ({ country, searchSetter }) => {
  return <>
    <p>{country.name.common} <button onClick={() => searchSetter(country.name.common)}>show</button></p>
  </>
}

const CountryList = ({ countries, searchSetter }) => {
  const count = countries.length

  switch (count) {
    case 0:
      return <p>Query returned no matches</p>
    case 1:
      return <Country country={countries[0]} />
    default:
      return (count <= 10)
        ? <>{countries.map(country => <CountryListEntry key={country.cca2} country={country} searchSetter={searchSetter} />)}</>
        : <p>Too many matches, use a more specific filter</p>
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(INFO_SOURCE)
      .then(response => setCountries(response.data))
      .catch(response => console.log('rejected'))
  }, [])

  const searchHandler = e => {
    e.preventDefault()
    setSearch(e.target.value)
  }
  
  return (
    <div>
      find countries <input value={search} onChange={searchHandler} />
      <CountryList countries={countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))} searchSetter={setSearch} />
    </div>
  );
}

export default App;
