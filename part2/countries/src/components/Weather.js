import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      {weather === '' ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>temperature {weather.main.temp} Celcius</div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  )
}

export default Weather