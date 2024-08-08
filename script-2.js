const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "your_api_key"; // Replace with your actual OpenWeatherMap API key

const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateWeatherInfo = (weather) => {
  return `
    <div class="profile-box">
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img alt="weather icon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" />
          </div>
          <div class="self">
            <h1>${weather.name}</h1>
            <h2>${weather.weather[0].description}</h2>
          </div>
        </div>
      </div>

      <div class="about">
        <h2>Temperature</h2>
        <p>${Math.round(weather.main.temp - 273.15)}°C</p>
      </div>
      <div class="status">
        <div class="status-item">
          <h3>Humidity</h3>
          <p>${weather.main.humidity}%</p>
        </div>
        <div class="status-item">
          <h3>Wind Speed</h3>
          <p>${weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  `;
};

const fetchWeather = async () => {
  const city = searchInputEl.value.trim();
  if (!city) {
    profileContainerEl.innerText = "Please enter a city name.";
    loadingEl.innerText = "";
    return;
  }

  loadingEl.innerText = "Loading...";
  loadingEl.style.color = "black";

  try {
    const res = await fetch(`${url}?q=${city}&appid=${apiKey}`);
    const data = await res.json();

    if (res.ok) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateWeatherInfo(data);
    } else {
      loadingEl.innerHTML = data.message || "City not found";
      loadingEl.style.color = "red";
      profileContainerEl.innerText = "";
    }

    console.log("data", data);
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "An error occurred. Please try again.";
    loadingEl.style.color = "red";
    profileContainerEl.innerText = "";
  }
};

searchButtonEl.addEventListener("click", fetchWeather);
