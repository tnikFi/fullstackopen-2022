import { useState, useEffect } from 'react'

import axios from 'axios'

const INFO_SOURCE = 'https://restcountries.com/v3.1/all'

// Map all languages of a country to an unordered list
// The languages are initially stored in an object like {'eng': 'English', ...}
// so we'll use Object.entries to map it like an array.
const LanguageList = ({ country }) => <ul>
  {
    Object.entries(country.languages)
      .map(lang => <li key={lang[0]}>{lang[1]}</li>)
  }
</ul>

const Flag = ({ country }) => <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      capital {country.capital}<br/>
      area {country.area}
      <h2>languages:</h2>
      <LanguageList country={country} />
      <Flag country={country} />
    </>
  )
}

const CountryList = ({ countries }) => {
  const count = countries.length

  switch (count) {
    case 0:
      return <p>Query returned no matches</p>
    case 1:
      return <Country country={countries[0]} />
    default:
      return (count <= 10)
        ? <>{countries.map(country => <p key={country.cca2}>{country.name.common}</p>)}</>
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
      <CountryList countries={countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  );
}

export default App;
