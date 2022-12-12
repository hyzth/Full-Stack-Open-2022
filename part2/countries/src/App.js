import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const refinedData = response.data.map(country => {
          return {
            name: country.name.common,
            area: country.area,
            capital: country.capital,
            flag: country.flags.png,
            languages: country.languages
          }
        })
        setCountries(refinedData)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} showCountry={setFilter} />
    </div >
  )
}

export default App