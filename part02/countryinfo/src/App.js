import { useState, useEffect } from 'react'
import Country from './Country'
import axios from 'axios'

const INFO_SOURCE = 'https://restcountries.com/v3.1/all'


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
