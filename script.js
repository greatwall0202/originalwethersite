// APIから天気データを取得して表示する関数
async function fetchWeatherData() {
    // APIのURL（APIキーと座標（緯度・経度）を設定）
    const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.6895&lon=139.6917&exclude=current,minutely,hourly,alerts&appid=YOUR_API_KEY';
    
    try {
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        displayWeatherData(weatherData);
    } catch (error) {
        console.error("天気データの取得に失敗しました:", error);
    }
}

// 36か所の天気データを表示する関数
function displayWeatherData(weatherData) {
    const weatherContainer = document.getElementById('weather-container');
    
    // 36か所の拠点名（実際にはこれに加えて、それぞれの拠点に対応する座標（緯度・経度）が必要です）
    const stations = [
        '久山倉庫店', '幕張倉庫店', '多摩境倉庫店', '尼崎倉庫店', '金沢シーサイド倉庫店',
        '川崎倉庫店', '札幌倉庫店', '入間倉庫店', '新三郷倉庫店', '前橋倉庫店',
        '京都八幡倉庫店', '座間倉庫店', '神戸倉庫店', '北九州倉庫店', '広島倉庫店',
        'つくば倉庫店', '千葉ニュータウン倉庫店', '中部空港倉庫店', 'ひたちなか倉庫店', '和泉倉庫店',
        'かみのやま倉庫店', '野々市倉庫店', '射水倉庫店', '岐阜羽島倉庫店', '富谷倉庫店',
        '浜松倉庫店', '木更津倉庫店', '熊本御船倉庫店', '石狩倉庫店', '守山倉庫店',
        '壬生倉庫店', '明和倉庫店', '門真倉庫店', '東近江倉庫店', '沖縄南城倉庫店'
    ];

    // 各拠点の天気情報を表示
    stations.forEach(station => {
        const card = document.createElement('div');
        card.classList.add('weather-card');
        
        // 明日と今日の気温の表示（サンプルとして東京のデータを使用）
        const todayTemp = weatherData.current.temp;  // 今日の気温
        const tomorrowTemp = weatherData.daily[1].temp.day;  // 明日の気温
        const tempDifference = tomorrowTemp - todayTemp;  // 気温差
        
        // 青色または赤色で気温差を表示
        card.innerHTML = `
            <h3>${station}</h3>
            <p>明日: ${tomorrowTemp}°C</p>
            <p>今日: ${todayTemp}°C</p>
            <p style="color: ${tempDifference < 0 ? 'blue' : 'red'};">差: ${tempDifference}°C</p>
        `;
        weatherContainer.appendChild(card);
    });
}

// ページが読み込まれた時に天気データを取得
window.onload = fetchWeatherData;
