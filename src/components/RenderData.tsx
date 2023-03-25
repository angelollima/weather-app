import React, { FormEvent, useState, useEffect } from "react";
import UserInput from "./UserInput";
import GetLocation from "./GetLocation";
import type { WeatherResponse } from "./GetLocation";

import rainBackground from '../img/rainBackground.jpeg'
import cloudsBackground from '../img/cloudsBackground.jpeg'
import thunderstormBackground from '../img/thunderstormBackground.jpeg'
import mistBackground from '../img/mistBackground.jpeg'
import sunnyBackground from '../img/sunnyBackground.jpeg'
import clearBackground from '../img/clearBackground.jpeg'
import drizzleDarkBackground from '../img/drizzleDarkBackground.jpeg'
import drizzleLightBackground from '../img/drizzleLightBackground.jpeg'
import snowLightBackground from '../img/snowLightBackground.jpeg'
import snowDarkBackground from '../img/snowDarkBackground.jpeg'

const RenderData = () => {

  interface DateTime {
    hour: number | string;
    minutes: number | string;
    dayInt: number;
    dayLong: string;
    month: string;
    year: number;
  }

  const [locationValue, setLocationValue] = useState('');
  const [temperature, setTemperature] = useState('metric');
  //const [responseData, setResponseData] = useState<((location: string, temperature: string) => Promise<WeatherResponse>) | null>(null);
  const [responseData, setResponseData] = useState<WeatherResponse | undefined>(undefined);
  const [weather, setWeather] = useState('');
  const [dataTime, setDateTime] = useState<DateTime>({
    hour: '',
    minutes: 0,
    dayInt: 0,
    dayLong: '',
    month: '',
    year: 0,
  })

  const getTime = (timezone: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let date = new Date()
    let utc = date.getTime() + date.getTimezoneOffset() * 60000
    let cityTime = utc + (1000 * timezone)
    let newCityTime = new Date(cityTime)
    setDateTime({
        hour: newCityTime.getHours() < 10 ? newCityTime.getHours().toString().padStart(2, '0') : newCityTime.getHours(),
        minutes: newCityTime.getMinutes() < 10 ? newCityTime.getMinutes().toString().padStart(2, '0') : newCityTime.getMinutes(),
        dayInt: newCityTime.getDate(),
        dayLong: dayNames[newCityTime.getDay()], 
        month: monthNames[newCityTime.getMonth()],
        year: newCityTime.getFullYear(),
    })
  }

  const setDegree = (temperatureValue: string) => {
    if (temperatureValue === 'metric') {
      return '°C'
    }
    else if (temperatureValue === 'imperial') {
      return '°F'
    }
    else {
      return '°K'
    }
  }

  useEffect(() => {
    const body = document.getElementById("body")
    if (body) {
      if (weather === "Rain") {
      body.setAttribute('style', `background-image: url(${rainBackground});background-repeat: no-repeat;background-position: center;background-size: cover;color: white`)
      } 
      else if (weather === "Clouds") {
        body.setAttribute('style', `background-image: url(${cloudsBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: black`)
      }
      else if (weather === "Thunderstorm") {
        body.setAttribute('style', `background-image: url(${thunderstormBackground});background-repeat: no-repeat;background-position: center;background-size: cover; color: white`)
      }
      else if (weather === "Mist") {
        body.setAttribute('style', `background-image: url(${mistBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: white`)
      }
      else if (weather === "Clear") {
        if (dataTime.hour > 18) {
          body.setAttribute('style', `background-image: url(${clearBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: white`)
        }
        else {
          body.setAttribute('style', `background-image: url(${sunnyBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: black`)
        }
      }
      else if (weather === "Drizzle") {
        if (dataTime.hour > 18) {
          body.setAttribute('style', `background-image: url(${drizzleDarkBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: white`)
        }
        else {
          body.setAttribute('style', `background-image: url(${drizzleLightBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: black`)
        }
      }
      else if (weather === "Snow") {
        if (dataTime.hour > 18) {
          body.setAttribute('style', `background-image: url(${snowDarkBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: white`)
        }
        else {
          body.setAttribute('style', `background-image: url(${snowLightBackground}); background-repeat: no-repeat; background-position: center; background-size: cover; color: black`)
        }
      }
      else {
        body.setAttribute('style', 'color: white')
      }
    }
  }, [responseData, weather, dataTime.hour])

  const processedData = {
    name: `${responseData?.name}`,
    country: `${responseData?.main ? responseData.sys.country : null}`,
    temperature: `${responseData?.main ? Math.round(responseData.main.temp) : null}`,
    feelsLikeTemperature: `${responseData?.main ? Math.round(responseData.main.feels_like) : null}`,
    degree: setDegree(temperature),
    mainWeather: `${responseData?.weather ? responseData.weather[0].main : null}`,
    descriptionWeather: `${responseData?.weather ? responseData.weather[0].description : null}`,
    humidity: `${responseData?.main ? responseData.main.humidity : null}`,
    windSpeed: `${responseData?.wind ? responseData.wind.speed : null}`,
    speed: `${temperature === 'imperial' ? 'MP/H' : 'KM/H'}`,
    hour: `${dataTime.hour}`,
    minutes: `${dataTime.minutes}`,
    dayInt: `${dataTime.dayInt}`,
    dayLong: `${dataTime.dayLong}`,
    month: `${dataTime.month}`,
    year: `${dataTime.year}`,
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Pass location and temperature to another function
    // setResponseData(() => GetLocation(locationValue, temperature));
    const data = await GetLocation(locationValue, temperature)
    setResponseData(data)
    setWeather(data.weather[0].main)
    getTime(data.timezone)
  };

  useEffect(() => {
    if (responseData !== undefined) {
      console.log(responseData);
    }
  }, [responseData]);

  return (
    <main className="h-[100vh] flex flex-col justify-center items-center">
      <section>
        <UserInput
          onSubmit={handleSubmit}
          onChange={(event) => setLocationValue((event.target as HTMLInputElement).value)}
          value={locationValue ?? ""}
        >
          {locationValue &&
            <div className="flex justify-around mt-4">
              <button type="submit" onClick={() => setTemperature('metric')} className="btn">°C</button>
              <button type="submit" onClick={() => setTemperature('imperial')} className="btn">°F</button>
              <button type="submit" onClick={() => setTemperature('standad')} className="btn">°K</button>
            </div>
          }
        </UserInput>
      </section>
      <section className="mt-6">
        {responseData && responseData.name !== undefined &&
          <div className="space-y-2">
            <div className=" grid grid-cols-2 text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>{processedData.temperature} {processedData.degree}</p>
              <p>Feels Like {processedData.feelsLikeTemperature} {processedData.degree}</p>
            </div>
            <div className=" grid grid-cols-2 text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>{processedData.mainWeather}</p>
              <p>{processedData.descriptionWeather}</p>
            </div>
            <div className="grid grid-cols-2 text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>{processedData.name}</p>
              <p>{processedData.country}</p>
            </div>
            <div className="grid grid-cols-2 text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>Humidity {processedData.humidity}</p>
              <p>Wind Speed {processedData.windSpeed}</p>
            </div>
            <div className="text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>{processedData.hour} : {processedData.minutes}</p>
            </div>
            <div className="text-center bg-transparent_screen backdrop-blur-3xl rounded-lg p-2">
              <p>{processedData.dayLong} {processedData.dayInt} {processedData.month} {processedData.year}</p>
            </div>
          </div>
        }
      </section>
    </main>
  )
}

export default RenderData
