export async function getWeather(query = 'Madrid') {
  return fetch(`/api/weather?q=${query}&days=5&lang=es`).then((data) => data.json());
}