let lat, lon;
const button = document.getElementById("check_in");
button.addEventListener("click", async() => {
    const data = {lat, lon}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json)
})


if ('geolocation' in navigator) {
    console.log('available');
    navigator.geolocation.getCurrentPosition(async position => {
        try{
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;


        const api_url= `weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        const air = json.air_quality.results[1].measurements[0]
        console.log(json)
        document.getElementById('loc').textContent = json.weather.timezone;
        document.getElementById('summary').textContent = json.weather.currently.summary;
        document.getElementById('temperature').textContent = json.weather.currently.temperature;
        document.getElementById("aq_matter").textContent = air.parameter;
        document.getElementById("aq_value").textContent = air.value;
        document.getElementById("aq_units").textContent = air.unit;
        document.getElementById("aq_date").textContent = air.lastUpdated;
    }catch(e){
        p = document.createElement("p");
        p.textContent = "No Data Avaliable for your location :("
        document.body.append(p)
    }
    });  
} else {
    console.log('not available');
}