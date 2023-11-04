import { json } from '@sveltejs/kit';
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '$env/static/private';
import type { Weather, WeatherResponse } from '$lib/types/weather';
const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST
  }
};

export async function GET(event) {
  const query = event.url.searchParams.get('q') === '' ? 'Madrid' : event.url.searchParams.get('q');
  let body: WeatherResponse  = {};
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=5`;

  const response = await fetch(url, FETCH_OPTIONS);
  const data: Weather = await response.json();
  const { location, current } = data;
  const { name, region, country, localtime } = location;
  const { temp_c, feelslike_c, humidity, wind_kph, wind_dir, condition, is_day } = current;
  const { text, code, icon } = condition;
  let backgroundImage = ''
  switch (text) {
    case 'Sunny':
      backgroundImage = 'https://c.wallhere.com/photos/c0/b7/urban_architecture_architettura_buildings_building_museo_automobile_torino-758032.jpg!d'
      break;
    case 'Haze':
      backgroundImage = 'https://www.setaswall.com/wp-content/uploads/2017/06/Fog-Wallpapers-23-2560-x-1600-768x480.jpg'
      break;
    case 'Mist':
      backgroundImage = 'https://external-preview.redd.it/uXph-aQl65LEMx6tzW_11oo3sUkJ5keWzhNx6VKuO_s.jpg?auto=webp&s=af33259ad0da522f2165033965cfd4dc99da07c1'
      break;  
    case 'Partly cloudy':
      backgroundImage = 'https://2.bp.blogspot.com/-QK3z166ztbg/URChSc5I-dI/AAAAAAAAAIo/BEoDCQNNzic/s1600/mostly+sunny.jpg'
      break;
    case 'Clear':
      backgroundImage = 'https://c1.wallpaperflare.com/preview/106/652/872/sky-blue-cloud-clear.jpg'
      break;
    default:
      break;
  }

  body = {
    city: name,
    region,
    country,
    localtime,
    temp: temp_c,
    feelsLike: feelslike_c,
    humidity,
    windSpeed: wind_kph,
    windDir: wind_dir,
    conditionText: text,
    conditionCode: code,
    conditionIcon: icon,
    isDay: is_day,
    backgroundImage
  }
  return json(body)
}