import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "f0bb297906b328ec3b62444463d815fb",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;

      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          const temperature = data.main.temp;
          const tempColor =
            temperature < 20 ? "blue" : temperature > 30 ? "red" : "black";
          setWeatherInfo(
            <div style={{ color: tempColor }}>
              {data.name}, {data.sys.country}, {data.weather[0].description},{" "}
              {temperature}
            </div>
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error);
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchCity(searchInput);
  };

  return (
    <>
      <div id="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>Search</button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div id="error">🤔 {errorMessage} 🤨</div>
            ) : (
              <div id="info">{weatherInfo}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
