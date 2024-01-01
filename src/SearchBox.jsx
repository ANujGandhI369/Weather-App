import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./SearchBox.css";
import { useEffect, useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState(""); //state variable access every fnx & method
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8a71347397ad181683ebf7f0b0f259d5";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_Like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    let mumbaiWeather = async () => {
      let citys = ["MUMBAI", "ANTARCTICA", "GREENLAND", "RACHI", "KOLKATA"];
      let cityName = citys[Math.floor(Math.random() * 5)];
      let res = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      let resJson = await res.json();
      console.log(resJson);
      let result = {
        city: cityName,
        feelsLike: resJson.main.feels_like,
        humidity: resJson.main.humidity,
        temp: resJson.main.temp,
        tempMax: resJson.main.temp_max,
        tempMin: resJson.main.temp_min,
        weather: resJson.weather[0].description,
      };
      infoWeather(result);
    };
    mumbaiWeather();
  }, []);

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /> <br />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place in our API</p>}
      </form>
    </div>
  );
}
