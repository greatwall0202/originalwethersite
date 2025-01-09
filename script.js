// 36か所の拠点名と緯度・経度
const stations = [
    { name: '久山倉庫店', lat: 33.6830, lon: 130.4736 },
    { name: '幕張倉庫店', lat: 35.6562, lon: 140.0250 },
    { name: '多摩境倉庫店', lat: 35.6146, lon: 139.4519 },
    { name: '尼崎倉庫店', lat: 34.7389, lon: 135.4191 },
    { name: '金沢シーサイド倉庫店', lat: 35.3735, lon: 139.6815 },
    { name: '川崎倉庫店', lat: 35.5206, lon: 139.7486 },
    { name: '札幌倉庫店', lat: 42.9275, lon: 141.4202 },
    { name: '入間倉庫店', lat: 35.8276, lon: 139.4066 },
    { name: '新三郷倉庫店', lat: 35.8982, lon: 139.8606 },
    { name: '前橋倉庫店', lat: 36.3911, lon: 139.0821 },
    { name: '京都八幡倉庫店', lat: 35.0250, lon: 135.6879 },
    { name: '座間倉庫店', lat: 35.4920, lon: 139.3839 },
    { name: '神戸倉庫店', lat: 34.6395, lon: 135.0354 },
    { name: '北九州倉庫店', lat: 33.8324, lon: 130.7710 },
    { name: '広島倉庫店', lat: 34.3344, lon: 132.4299 },
    { name: 'つくば倉庫店', lat: 36.0552, lon: 140.0971 },
    { name: '千葉ニュータウン倉庫店', lat: 35.9404, lon: 140.1389 },
    { name: '中部空港倉庫店', lat: 34.8583, lon: 137.4419 },
    { name: 'ひたちなか倉庫店', lat: 36.3794, lon: 140.5279 },
    { name: '和泉倉庫店', lat: 34.4882, lon: 135.4095 },
    { name: 'かみのやま倉庫店', lat: 38.0347, lon: 140.2621 },
    { name: '野々市倉庫店', lat: 36.5762, lon: 136.6407 },
    { name: '射水倉庫店', lat: 36.7186, lon: 137.0624 },
    { name: '岐阜羽島倉庫店', lat: 35.4130, lon: 136.8013 },
    { name: '富谷倉庫店', lat: 38.3477, lon: 140.8091 },
    { name: '浜松倉庫店', lat: 34.7465, lon: 137.7254 },
    { name: '木更津倉庫店', lat: 35.3690, lon: 139.9206 },
    { name: '熊本御船倉庫店', lat: 32.8249, lon: 130.7359 },
    { name: '石狩倉庫店', lat: 43.1193, lon: 141.6773 },
    { name: '守山倉庫店', lat: 35.2209, lon: 136.9793 },
    { name: '壬生倉庫店', lat: 36.3127, lon: 139.7095 },
    { name: '明和倉庫店', lat: 36.2317, lon: 139.3227 },
    { name: '門真倉庫店', lat: 34.7490, lon: 135.6047 },
    { name: '東近江倉庫店', lat: 35.1457, lon: 136.1620 },
    { name: '沖縄南城倉庫店', lat: 26.1713, lon: 127.7011 }
];

// APIから天気データを取得して表示する関数
async function fetchWeatherData() {
    try {
        // 各拠点に対して天気データを取得
        for (const station of stations) {
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${station.lat}&lon=${station.lon}&exclude=current,minutely,hourly,alerts&appid=813c14220b370c5211a0aa9b7af25372
`;
            const weatherResponse = await fetch(weatherApiUrl);
            const weatherData = await weatherResponse.json();
            displayWeatherData(station, weatherData);
        }
    } catch (error) {
        console.error("天気データの取得に失敗しました:", error);
    }
}

// 各拠点の天気データを表示する関数
function displayWeatherData(station, weatherData) {
    const weatherContainer = document.getElementById('weather-container');

    // 各拠点の天気情報を表示
    const card = document.createElement('div');
    card.classList.add('weather-card');
    
    // 明日と今日の気温の表示
    const todayTemp = weatherData.current.temp;  // 今日の気温
    const tomorrowTemp = weatherData.daily[1].temp.day;  // 明日の気温
    const tempDifference = tomorrowTemp - todayTemp;  // 気温差
    
    // 青色または赤色で気温差を表示
    card.innerHTML = `
        <h3>${station.name}</h3>
        <p>明日: ${tomorrowTemp}°C</p>
        <p>今日: ${todayTemp}°C</p>
        <p style="color: ${tempDifference < 0 ? 'blue' : 'red'};">差: ${tempDifference}°C</p>
    `;
    weatherContainer.appendChild(card);
}

// ページが読み込まれた時に天気データを取得
window.onload = fetchWeatherData;
