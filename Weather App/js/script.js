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




const cityInput = document.querySelector(".city-input"),
    searchbtn = document.querySelector(".search-btn"),
    locationbtn = document.querySelector(".location-btn"),
    weatherCardsDiv = document.querySelector(".weather-cards"),
    currentWeatherDiv = document.querySelector(".current-weather"),
    API_KEY = "20cb2e2663bf029faa7e6a00b001cdb5";


const createWeatherCard = (cityName, weatherItem, index) => {
    const tempCelsius = (weatherItem.main.temp - 273.15).toFixed(2);

    if (index === 0) {
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${tempCelsius}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed}M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class = "icon">
                    <img src = "https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt = "weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else {
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <h6>Temp: ${tempCelsius}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherData = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    fetch(WEATHER_API_URL)
        .then(res => res.json())
        .then(data => {
            const uniqueDates = [];
            const fiveDays = data.list.filter(Obj => {
                const fiveDaysDates = new Date(Obj.dt_txt).getDate();
                if(!uniqueDates.includes(fiveDaysDates)){
                    return uniqueDates.push(fiveDaysDates);
                }
            });

            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            fiveDays.forEach((weatherItem, index) => {
                const html = createWeatherCard(cityName, weatherItem, index);
                if(index === 0){
                    currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                } else{
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        }).catch(() => {
            alert("An error occured while fetching the weather forecast!");
        })
}


const getCityCoord = () => {
    const cityName = cityInput.value.trim();
    if(cityName === "") return alert("Empty search space!!");
   
    const API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    fetch(API)
        .then(res => res.json())
        .then(data => {
            if(!data.length) return alert(`No coordinates for the city ${cityName}`);
            const { lat, lon, name } = data[0];
            getWeatherData(name, lat, lon);
        }).catch(() => {
            alert("An error occured while fetching the coordinates!");
        });
}
console.log(navigator);

const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        position => {//usercallback
            const {latitude, longitude} = position.coords;
            const revApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

            fetch(revApiUrl)
                .then(res => res.json())
                .then(data => {
                    const { name } = data[0];
                    getWeatherData(name, latitude, longitude);
                }).catch(() => {
                    alert("An error has occured while fetching the city name!");
                })
        },
        error => {
            if(error.code === error.PERMISSION_DENIED){
                alert("Geolocation request denied. Please allow location access to use this feature.");
            }
        }
    );
}

searchbtn.addEventListener("click", getCityCoord);
locationbtn.addEventListener("click", getUserLocation);












