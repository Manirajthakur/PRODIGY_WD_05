const apiKey = "416b9c4cad0ed137cfde590c25a10239";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const weather = document.getElementById("weather");
const loading = document.getElementById("loading");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const icon = document.getElementById("icon");

searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeatherByCity(cityName);

});

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        searchBtn.click();
    }

});

locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getWeatherByLocation(lat, lon);

            },

            () => {

                alert("Unable to access your location.");

            }

        );

    }
    else {

        alert("Geolocation is not supported.");

    }

});

async function getWeatherByCity(cityName) {

    loading.style.display = "block";
    weather.style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {

            alert("City not found.");
            loading.style.display = "none";
            return;

        }

        showWeather(data);

    }
    catch (error) {

        alert("Something went wrong.");

    }

}

async function getWeatherByLocation(lat, lon) {

    loading.style.display = "block";
    weather.style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        showWeather(data);

    }
    catch (error) {

        alert("Unable to fetch weather.");

    }

}

function showWeather(data) {

    loading.style.display = "none";
    weather.style.display = "block";

    city.innerHTML = `${data.name}, ${data.sys.country}`;

    temp.innerHTML = `${Math.round(data.main.temp)}°C`;

    condition.innerHTML = data.weather[0].main;

    humidity.innerHTML = data.main.humidity + " %";

    feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";

    pressure.innerHTML = data.main.pressure + " hPa";

    wind.innerHTML = (data.wind.speed * 3.6).toFixed(1) + " km/h";

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    changeBackground(data.weather[0].main);

}

function changeBackground(weatherType){

    weatherType = weatherType.toLowerCase();

    if(weatherType.includes("clear")){

        document.body.style.background =
        "linear-gradient(135deg,#f7971e,#ffd200)";

    }

    else if(weatherType.includes("cloud")){

        document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00c6fb)";

    }

    else if(weatherType.includes("rain")){

        document.body.style.background =
        "linear-gradient(135deg,#141e30,#243b55)";

    }

    else if(weatherType.includes("thunder")){

        document.body.style.background =
        "linear-gradient(135deg,#232526,#414345)";

    }

    else if(weatherType.includes("snow")){

        document.body.style.background =
        "linear-gradient(135deg,#83a4d4,#b6fbff)";

    }

    else if(weatherType.includes("mist") || weatherType.includes("fog")){

        document.body.style.background =
        "linear-gradient(135deg,#606c88,#3f4c6b)";

    }

    else{

        document.body.style.background =
        "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";

    }

}
