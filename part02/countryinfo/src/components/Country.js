import React from 'react';

import Weather from './Weather';

// Map all languages of a country to an unordered list
// The languages are initially stored in an object like {'eng': 'English', ...}
// so we'll use Object.entries to map it like an array.
const LanguageList = ({ country }) => <ul>
  {
    Object.entries(country.languages)
      .map(lang => <li key={lang[0]}>{lang[1]}</li>)
  }
</ul>

const Flag = ({ country }) => <img src={country.flags.png} alt={`Flag of ${country.name?.common}`} />

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

export default Country;