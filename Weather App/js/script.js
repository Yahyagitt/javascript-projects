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
    searchBtn = document.querySelector(".search-btn"),
    locationBtn = document.querySelector(".location-btn"),
    currentDiv = document.querySelector(".current-weather"),
    weatherDiv = document.querySelector(".cards"),
    API_KEY = "20cb2e2663bf029faa7e6a00b001cdb5";


const getDivData = (weatherItem, cityName, index) => {//peek img
    temp = (weatherItem.main.temp - 273.15).toFixed(1)//forgot
    if(index === 0){
        return `<h2>Current Weather</h2>
                <div class="details">
                    <h2>${cityName}(${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${temp}℃</h6>
                    <h6>Wind: ${weatherItem.wind.speed}M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class = "icon">
                    <img src = "https://openweathermap.org/img/wn/10d@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`
    } else {
        return `<li class="card">
                        <h4>(${weatherItem.dt_txt.split(" ")[0]})</h4>
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
            if(!data.list) return alert("An erro❌r has occured and data didnt arrive");//m

            const uniquetemp = [];
            const fiveDays = data.list.filter(obj => {//obj is current ele
                const fiveDaysDates = new Date(obj.dt_txt).getDate();//m
                if(!uniquetemp.includes(fiveDaysDates)){
                    uniquetemp.push(fiveDaysDates);
                    return true;
                }
                return false;
            });

            currentDiv.innerHTML = "";//m used .innerhtml
            weatherDiv.innerHTML = "";
            cityInput.value = "";

            fiveDays.forEach((weatherItem, index) => {
                const html = getDivData(weatherItem,cityName,index);
                if(index === 0){
                    currentDiv.insertAdjacentHTML("beforeend",html)//d
                } else {
                    weatherDiv.insertAdjacentHTML("beforeend",html)
                }
            });
        })
}

const getCoord = () => {
    const cityName = cityInput.value.trim();//m
    if(!cityName) return alert("Enter a city name!");
    const WEATHER_API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`//m https?

    fetch(WEATHER_API)
        .then(res => res.json())
        .then(data => {
            if(!data.length) return alert("An error❌occured while gettin lat and lon");

            const { name, lat, lon } = data[0];
            getWeatherData(name, lat, lon);
        }).catch(() => {
            alert("An error❌ has occured while fetching the data")
        })
}

console.log(navigator);
const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const REVAPI = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

            fetch(REVAPI)
                .then(res => res.json())
                .then(data => {
                    const { name } = data[0];
                    getWeatherData(name, latitude, longitude);
                }).catch(() => {
                    alert("An error❌ has occured")
                });
        }, (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("❌ Permission denied. Please enable location access.");
            }
        }
    )
} 
searchBtn.addEventListener("click",getCoord);
locationBtn.addEventListener("click",getUserLocation);