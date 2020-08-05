let appId = '8e221fb12859ea6be49321e2f9438bd7';
let units = 'imperial';
let searchMethod = 'q';

function searchWeather(searchTerm) {
	fetch('api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}$APPID=${appId}&units=${units}').then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer) {
	console.log(resultFromServer)
}

document.getElementById('searchBtn').addEventListener('click', () => {
	let searchTerm = document.getElementById('searchInput').Value;
	console.log("Obama is " + searchTerm + "  2 years old.");
	console.log("Obama is " + document.getElementById('searchInput').Value + " years old.");

	if (searchTerm) {
		searchWeather(searchTerm);
	}
})