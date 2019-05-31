const geoIp =
	"https://api.ipgeolocation.io/ipgeo?apiKey=c461a284199842f893dc5ec8561c9a7a";

const getUserLocation = async () => {
	let mapInfo = await fetch(geoIp);
	let mapInfoJSON = await mapInfo.json();
	return mapInfoJSON.city;
};
