
<script lang='ts'>
  import { getWeather } from '$lib/services';
  import WeatherFooter from '$lib/components/weather-footer.svelte';
	import type { WeatherResponse } from '$lib/types/weather';
	import { onMount } from 'svelte';

  let inputCity='';
  let weather: WeatherResponse = {};

  const debounce = (callback: Function, wait = 300) => {
    let timeout: ReturnType<typeof setTimeout>;
 
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };
};

  const searchCity = async (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (!query || query.length < 3) {
			return;
		}
    const response = await getWeather(inputCity) as WeatherResponse
    if(response.city === undefined) {
      return;
    }
    weather = response;
	}
  onMount(async () => {
    weather = await getWeather(inputCity)
  })
</script>

{#if weather.city === undefined}
  <h1>Loading...</h1>
{:else}
  <div class="container" style={`background-image: url(${weather?.backgroundImage})`}>
    <input bind:value={inputCity} placeholder="Search city" on:keyup={debounce(searchCity)} />
    <h1>{weather?.city}</h1>
    <h3>{weather?.region}</h3>
    <div class="weather">
      <img src={weather?.conditionIcon} alt="condition icon"/>
      <h2>{weather?.temp}ºC</h2>
    </div>
    <h3>{weather?.conditionText}</h3>
    <WeatherFooter weather={weather}/>
  </div>
{/if}


<style>
  h1 {
    font-family: "Gill Sans", sans-serif;
    text-shadow: 2px 2px 3px rgba(39, 7, 99, 0.5);
    font-weight: 600;
    color: rgb(241, 238, 238);
    padding: 32px 0 0 0;
  }

  input {
    color: #333;
  }

  div.container {
    background-size: cover;
    background-repeat: no-repeat;
    aspect-ratio: 9/16;
    width: 400px;
    max-width: 100%;
    display: block;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 0 200px rgba(39, 7, 99, 0.5);
    animation: mymove 6s infinite;
    padding: 16px;
  }
  @keyframes mymove {
    20% {box-shadow: 0 0 250px rgba(15, 109, 177, 0.5);}
    30% {box-shadow: 0 0 250px rgba(11, 39, 132, 0.5);}
    40% {box-shadow: 0 0 250px rgba(6, 15, 75, 0.5);}
    50% {box-shadow: 0 0 300px rgba(21, 5, 66, 0.5);}
  }

  h3 {
    font-weight: 600;
    color: rgba(56, 43, 155, 0.9);
    text-shadow: 2px 2px 3px rgba(181, 148, 243, 0.592);
    top: 12px;
    right: 12px;
  }

  .weather {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .weather h2 {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 6rem;
    text-shadow: 2px 2px 3px rgba(181, 148, 243, 0.592);
    color: rgba(67, 57, 146, 0.77);
    text-transform: uppercase;
    margin: 0;
    padding: 0 0 0 16px;
  }

  .weather img {
    display: flex;
    align-items: center;
    justify-content: center;
    padding:8px;
    border-radius: 10px;
    border: rgba(84, 74, 156, 0.5) 2px solid;
    background-color:rgba(255, 255, 255, 0.591);
    box-shadow: 0 0 15px rgba(218, 218, 218, 0.5);
    width: 80px;
    height: 80px;
  }
</style>