const apiKey = '813c14220b370c5211a0aa9b7af25372'; // Your OpenWeatherMap API Key

// Coordinates for the three locations
const locations = [
    { name: '久山倉庫店', lat: 33.6830, lon: 130.4736 },
    { name: '幕張倉庫店', lat: 35.6562, lon: 140.0250 },
    { name: '多摩境倉庫店', lat: 35.6146, lon: 139.4519 }
];

// Fetch weather data for tomorrow for the three locations
function fetchWeather(location, index) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&cnt=2&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // APIレスポンス全体をログに出力してデバッグ

            // 'data.list'が存在し、2つ以上の要素が含まれていることを確認
            if (data && data.list && data.list.length > 1) {
                const tempTomorrow = data.list[1]?.main?.temp; // オプショナルチェイニング（?.）

                // 'tempTomorrow'が定義されていれば表示
                if (tempTomorrow !== undefined) {
                    document.getElementById(`temp${index}`).innerHTML = `${tempTomorrow}°C`;
                } else {
                    document.getElementById(`temp${index}`).innerHTML = 'No temperature data available';
                }
            } else {
                document.getElementById(`temp${index}`).innerHTML = 'Error: Invalid data';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById(`temp${index}`).innerHTML = 'Error';
        });
}


// Fetch 7-day forecast for a given location
function fetchForecast(location) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.lat}&lon=${location.lon}&units=metric&cnt=7&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = '<ul>';
            data.list.forEach(day => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                const tempMin = day.temp.min;
                const tempMax = day.temp.max;
                const weather = day.weather[0].description;
                forecastHtml += `
                    <li>
                        <strong>${date}</strong>: ${weather}, ${tempMin}°C - ${tempMax}°C
                    </li>
                `;
            });
            forecastHtml += '</ul>';
            document.getElementById('forecast-details').innerHTML = forecastHtml;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            document.getElementById('forecast-details').innerHTML = 'Error';
        });
}

// Event listeners for location clicks
document.getElementById('location1').addEventListener('click', () => fetchForecast(locations[0]));
document.getElementById('location2').addEventListener('click', () => fetchForecast(locations[1]));
document.getElementById('location3').addEventListener('click', () => fetchForecast(locations[2]));

// Initialize by fetching weather data for tomorrow
locations.forEach((location, index) => fetchWeather(location, index + 1));
