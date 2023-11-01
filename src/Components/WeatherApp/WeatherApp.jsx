import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
export const WeatherApp = () => {
  const [wicon, setwicon] = useState(cloud_icon)
  let api_key = "498b155905a6e088248b41003e3e5e1f"
  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "") { return 0; }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();
    // Handle data
    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")
    
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.round(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.round(data.main.temp) + `&deg;C`;
    location[0].innerHTML = data.name;

    if (data.weather[0].id === "01d" || data.weather[0].id === "01n") {
      setwicon(clear_icon)
    }
    else if (data.weather[0].id === "02d" || data.weather[0].id === "02n") {
      setwicon(cloud_icon)
    }
    else if (data.weather[0].id === "03d" || data.weather[0].id === "03n") {
      setwicon(drizzle_icon)
    }
    else if (data.weather[0].id === "04d" || data.weather[0].id === "04n") {
      setwicon(drizzle_icon)
    }
    else if (data.weather[0].id === "09d" || data.weather[0].id === "09n") {
      setwicon(rain_icon)
    }
    else if (data.weather[0].id === "10d" || data.weather[0].id === "10n") {
      setwicon(rain_icon)
    }
    else if (data.weather[0].id === "13d" || data.weather[0].id === "13n") {
      setwicon(snow_icon)
    }
    else{
      setwicon(clear_icon)
    }

  }
  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div className="search-icon" onClick={() => { search() }}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24&deg;C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="data" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="data" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
