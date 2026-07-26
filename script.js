// ================================
// Weather App
// ================================

const apiKey = "30d39b9ab851ffb138dfffc974bb2a28";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const weatherCondition = document.getElementById("weatherCondition");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");

const weatherIcon = document.getElementById("weatherIcon");

const errorMessage = document.getElementById("errorMessage");
const loader = document.getElementById("loader");

// ================================
// Fetch Weather
// ================================

async function checkWeather(city) {

    city = city.trim();

    if (city === "") {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "⚠ Please enter a city name.";
        return;
    }

    loader.style.display = "block";
    errorMessage.style.display = "none";

    searchBtn.disabled = true;

    try {

        console.log("Searching for:", city);
        console.log(`${apiUrl}${city}&appid=${apiKey}`);

        const response = await fetch(
            `${apiUrl}${city}&appid=${apiKey}`
        );

        console.log("Status:", response.status);
        console.log("Response:", response);

        if (!response.ok) {

            loader.style.display = "none";
            searchBtn.disabled = false;

            errorMessage.style.display = "block";
            errorMessage.innerHTML = "❌ City not found.";

            temperature.innerHTML = "--°C";
            cityName.innerHTML = "Search a city";
            weatherCondition.innerHTML = "--";
            humidity.innerHTML = "--%";
            wind.innerHTML = "-- km/h";
            feelsLike.innerHTML = "--°C";
            pressure.innerHTML = "----";

            return;
        }

        const data = await response.json();

        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;

        cityName.innerHTML =
            `${data.name}, ${data.sys.country}`;

        weatherCondition.innerHTML =
            data.weather[0].description;

        humidity.innerHTML =
            `${data.main.humidity}%`;

        wind.innerHTML =
            `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        feelsLike.innerHTML =
            `${Math.round(data.main.feels_like)}°C`;

        pressure.innerHTML =
            `${data.main.pressure} hPa`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        cityInput.value = "";

    }

    catch (error) {
        console.error(error);

        loader.style.display = "none";
        searchBtn.disabled = false;

        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Something went wrong!";
    }
    finally {

        loader.style.display = "none";
        searchBtn.disabled = false;

    }

}

// ================================
// Search Button
// ================================

searchBtn.addEventListener("click", () => {

    checkWeather(cityInput.value);

});

// ================================
// Enter Key
// ================================

cityInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        checkWeather(cityInput.value);

    }

});

// ================================
// Default City
// ================================

checkWeather("Ranchi");