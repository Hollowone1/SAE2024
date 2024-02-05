<template>
 <h2> Map View</h2>
 <div id="game-container">
    <img>

 </div>

</template>

<script>

export default{
    data() {
    return {
        map : L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
    }),

}

let map = getElementByID("Game-Container");


});

L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    }

</script>



<style>

</style>

