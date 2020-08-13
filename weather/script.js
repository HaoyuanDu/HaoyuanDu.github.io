let appId = '8e221fb12859ea6be49321e2f9438bd7';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
	var zip = parseInt(searchTerm, 10);
	if(zip && zip.toString()== searchTerm && searchTerm.length != 5){
		console.log('resultFromServer')

	}else if(zip && zip.toString()== searchTerm && searchTerm.length == 5){
		searchMethod = 'zip';
	}else{
		searchMethod = 'q';
	}
}

function searchWeather(searchTerm) {

	getSearchMethod(searchTerm)
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer) {
	switch(resultFromServer.weather[0].main){
		case 'Clear':
			document.body.style.backgroundImage =  'url("clear.jpg")';
			break;
		case 'Clouds':
			document.body.style.backgroundImage = 'url("clouds.jpg")';
			break;
		case 'Rain':
			document.body.style.backgroundImage = 'url("rains.jpg")';
			break;
		case 'Drizzle':
			document.body.style.backgroundImage = 'url("drizzle.jpg")';
			break;
		case 'Mist':
			document.body.style.backgroundImage = 'url("mist.jpg")';
			break;
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("thunder.jpg")';
			break;
		case 'Snow':
			document.body.style.backgroundImage = 'url("snow.jpg")';
			break;
		default:
			break;

	}
	let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
	let temperatureElement = document.getElementById('temperature');
	let humidityElement = document.getElementById('humidity');
	let windSpeedElement = document.getElementById('windSpeed');
	let cityHeader = document.getElementById('cityHeader');
	let weatherIcon = document.getElementById('documentIconImg');

	weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
	//weatherIcon.src = 'http://openweathermap.org/img/wn/10d@2x.png';

	let resultDescription = resultFromServer.weather[0].description;
	//weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUppercase(); //+ resultDescription.slice(1);
	weatherDescriptionHeader.innerText = resultDescription;

	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	windSpeedElement.innerHTML = 'winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
	setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
	let weatherContainer = document.getElementById('weatherContainer');
	let weatherContainerHeight = weatherContainer.clientHeight;
	let weatherContainerWidth = weatherContainer.clientWidth;
	weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
	weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
	weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
	if (searchTerm) {
		searchWeather(searchTerm);
	}
})