// API Response
// ├─ cod
// ├─ message
// ├─ cnt
// ├─ list[]   <-- weatherItem points here
// │  ├─ dt
// │  ├─ main
// │  ├─ weather[]
// │  ├─ wind
// │  └─ dt_txt
// └─ city
//    ├─ name
//    ├─ coord
//    └─ country




const cityInput = document.querySelector('.city-input'),
    searchBtn = document.querySelector('.search-btn'),
    locationBtn = document.querySelector('.location-btn'),
    currentDiv = document.querySelector('.current-weather'),
    weatherCardsDiv = document.querySelector('.cards'),
    API_KEY = "20cb2e2663bf029faa7e6a00b001cdb5";


const getDivData = (weatherItem, cityName, index) => {
    const temp = (weatherItem.main.temp - 273.15).toFixed(1);

    if(index === 0){
        return `<h2>Current Weather</h2>
                <div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <p>
                        Temperature: <span id="tempValue">${temp}</span>
                        <select id="toggleUnit">
                            <option value="C" selected>°C</option>
                            <option value="F">°F</option>
                        </select>
                    </p>
                    <h6>Wind: ${weatherItem.wind.speed}M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                    <p id="lastUpdated"></p>
                </div>
                <div class = "icon">
                    <img src = "https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt = "weather icon">
                    <h3>${weatherItem.weather[0].description}</h3>`
    } else {
        return `<li class="card">
                        <h4>${weatherItem.dt_txt.split(" ")[0]}</h4>
                        <h6>Temp: ${temp}℃</h6>
                        <h6>Wind: ${weatherItem.wind.speed}M/S</h6>
                        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                    </li>`
    }
}

const getWeatherData = (cityName, lat, lon) => {
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API)
        .then(res => res.json())
        .then(data => {
            if(!data.list) return alert("An error has occured while fetching the data");

            const uniqueDates = [];
            const fiveDays = data.list.filter(obj => {
                const fiveDaysDates = new Date(obj.dt_txt).getDate();
                if(!uniqueDates.includes(fiveDaysDates)){
                    uniqueDates.push(fiveDaysDates);
                    return true;
                }
                return false;
            })

            currentDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";
            cityInput.value = "";

            fiveDays.forEach((weatherItem, index) => {
                const html = getDivData(weatherItem, cityName, index);
                if(index === 0){
                    currentDiv.insertAdjacentHTML("beforeend",html);
                    displayFeatures(weatherItem);
                } else{
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        }).catch(() => alert("Error fetching weather data"));
}

const getCoords = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return alert("Enter a citys name!!");

    const COORD_API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(COORD_API)
        .then(res => res.json())
        .then(data => {
            if(!data.length) return alert("An error has occured while fetching data using city name");

            const { name, lat, lon} = data[0];
            getWeatherData(name, lat, lon);
        }).catch(() => {
            return alert("An error has occured while fetching data using city name");
        });
}

const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const REV_API = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

            fetch(REV_API)
                .then(res => res.json())
                .then(data => {
                    if(!data.length) return alert("An error has occured while fetching rev geolocation");

                    const { name } = data[0];
                    getWeatherData(name, latitude, longitude);
                })
                .catch(() => alert("Error fetching weather data"))
        }, (error) => {
            return alert("An error has occured location permission was not granted");
        }
    );
}


let tempCalVar;

function displayFeatures(weatherItem){
    const tempC = (weatherItem.main.temp - 273.15).toFixed(1);
    tempCalVar = parseFloat(tempC);

    const tempValue = document.getElementById('tempValue'),
        tempSlct = document.getElementById('toggleUnit'),
        lastUpdated = document.getElementById('lastUpdated');

    tempValue.textContent = `${tempC}°C`;
    const now = new Date();
    lastUpdated.textContent = `Last Updated ${now.toLocaleTimeString()}`

    tempSlct.addEventListener("change",() =>{
        const selectedUnit = tempSlct.value;
        if(selectedUnit === "F"){
            const tempF = (tempCalVar * 9 / 5) + 32;
            tempValue.textContent = `${tempF.toFixed(1)}°F`
        } else if(selectedUnit === "C"){
            tempValue.textContent = `${tempCalVar.toFixed(1)}°C`
        }
    })
}

searchBtn.addEventListener("click", getCoords);
locationBtn.addEventListener("click",getUserLocation);












