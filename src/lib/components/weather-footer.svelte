<script lang="ts">
  import type { WeatherResponse } from '$lib/types/weather';
  export let weather: WeatherResponse;
</script>
<footer>
  <div>
    <span>
     {weather?.humidity}%
    </span>
    <strong>
      Humidity
    </strong>
  </div>
  <div>
    <span>
      {weather?.windSpeed} km/h
    </span>
    <strong>
      Wind Speed
    </strong>
  </div>
  <div>
    <span>
      {weather?.feelsLike}ºC
    </span>
    <strong>
      Feels Like
    </strong>
  </div>
</footer>

<style>
  footer {
    border: 2px solid #4e1f99;
    color: #4e1f99;
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    width: calc(100% - 32px);
    margin: 0 auto;
    text-align: center;
    display: flex;
    border-radius: 10px;
    padding: 16px;
    justify-content: space-evenly;
    background-color:rgba(255, 255, 255, 0.779);
  }

  span {
    display: block;
    font-weight: 600;
    text-shadow: 2px 2px 3px rgba(39, 7, 99, 0.5);
  }

  strong {
    text-shadow: 2px 2px 3px rgba(39, 7, 99, 0.5);
    font-weight: 600;
  }
</style>