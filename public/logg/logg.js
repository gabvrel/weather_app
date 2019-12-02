getData();

async function getData(){
    const response = await fetch("/api");
    const data = await response.json();
    const body = document.body;

    data.map(el => {
        const div = document.createElement("div");
        const parr1 = document.createElement("p");
        const parr2 = document.createElement("p");
        parr1.textContent = `Latitude: ${el.lat} Longitude: ${el.lon} `;
        parr2.textContent = new Date(el.timestamp).toLocaleDateString();
        body.append(div);
        div.append(parr1);
        div.append(parr2);
    });
}