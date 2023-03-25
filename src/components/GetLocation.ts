import axios from "axios"

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const GetLocation = async (location: string, temperature: string): Promise<WeatherResponse> => {

  const appId = 'bf600da4c3f1b5f1991088f2e2fa7478'
  const urlPresentDay = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appId}&units=${temperature}`
  
  const response = await axios.get(urlPresentDay)
  const responseData: WeatherResponse = await response.data
  return responseData;
}

export default GetLocation
