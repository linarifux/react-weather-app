import axios from "axios";
import React, { useState } from "react";

const api = {
  key: '2fa5b5436b783f271e68e1a6ed73bb1a',
  base: 'https://api.openweathermap.org/data/2.5'
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = async evt => {
    if (evt.key === 'Enter') {
      const { data } = await axios(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
      console.log(data);
      setWeather(data)
      setQuery('')
    }
  }


  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Mondya', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={`App  ${weather?.main?.temp > 16 ? 'warm' : ''}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={e => search(e)}
          />
        </div>
        { weather.weather ? (<div><div className="location-box">
          <div className="location">{weather?.name}, {weather?.sys?.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
          <div className="weather-box">
            <div className="temp">
              {weather ? Math.round(weather?.main?.temp) : ''}°C
            </div>
            <div className="weather">
              {weather.weather ? weather.weather[0].main : ''}
            </div>
          </div></div>) : (<div>
            <div className="warning">Please, Enter a location name.</div>
          </div>)}
      </main>
    </div>
  );
}

export default App;
