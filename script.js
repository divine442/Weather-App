const { error } = require("console");
const { response } = require("express");


function getweather(){
    const apiKey ='30cb15dc73ebcc005848d1e513e20817';
    const city = document.getElementById('city').value

    

    if(!city){
        alert('Please enter a city')
        return
    }

   

    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`


    fetch(currentWeather)
        .then(response => response.json())
        .then(data => {
            displayWeather(data)
        })
        .catch(error=>{
            console.error('Error fetching curremt weather data: ', error);
            alert('Error fetching current weather data. Please try again. ')
        })

    fetch(forcast)
        .then(response => response.json())
        .then(data => {
            displayForecast(data.list)
        })
        .catch(error=>{
            console.error('Error fetching forecast weather data: ', error);
            alert('Error fetching forecast weather data. Please try again. ')
        })

 
    
}

function displayWeather(data){
    const tempinfo    = document.getElementById('temp')
    const weatherinfo = document.getElementById('info')
    const iconinfo = document.getElementById('weather-icon')
    const hourlyforecast = document.getElementById('hour-forecast')



    //clear the previous cotent
    tempinfo.innerHTML = ''  
    weatherinfo.innerHTML = ''  
    hourlyforecast.innerHTML = ''

    if(data.cod === '404'){
        weatherinfo.innerHTML = `<p>${data.message}<p>`
    } else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempinfo.innerHTML = temperatureHTML;
        weatherinfo.innerHTML = weatherHtml;
        iconinfo.src = iconUrl;
        iconinfo.alt = description;
        showImage();
    }
}




function displayForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hour-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const icon = document.getElementById('weather-icon');
    icon.style.display = 'block'; // Make the image visible once it's loaded
}


