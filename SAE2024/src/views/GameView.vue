<template>
  <div class="page-container">
    <h2>Devinez où est située cette image ?</h2>
    <div class="game-container">
      <!--      <img src="../assets/a2c7fc86c6b887959f61fd704ff9d8c2bbc1c34f774d3dc41654207db787be9d.webp">-->
      <!--      <img :src="'http://localhost:8055/assets/' + extractedData[this.currentSequenceIndex].image.id">-->
      <img alt="image de la partie" :src="'http://localhost:8055/assets/' + extractedData[currentItemIndex].image.id">
      <div class="mapstyle">
        <l-map ref="map" v-model:zoom="zoom" :center="center" :max-zoom="maxZoom" :min-zoom="minZoom"
               :zoom-control="false" :useGlobalLeaflet="false" @click="placeMarker">
          <l-tile-layer
              url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=b90e089c365242a3a08dbb49a7084a61"
              layer-type="base" name="OpenStreetMap"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" :draggable="true" @dragend="onMarkerDragEnd" @click="checkDistance">
            <l-popup :content="popupContent"/>
          </l-marker>
        </l-map>
      </div>

    </div>
    <div class="score-container">

      <table class="points-table">
        <thead>
        <tr>
          <th>Essais Restants</th>
          <th>Score</th>
          <th>Meilleure Distance</th>

        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ this.attemptsPerItem - this.currentAttemptIndex }}</td>
          <td>{{ score }}</td>
          <td>{{ bestDistance }} km</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="gameOver">
      <p>Fin de la partie ! Score final : {{ score }}</p>
      <button @click="resetGame" class="rejouer">Recommencer</button>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {LMap, LTileLayer, LMarker, LPopup} from "@vue-leaflet/vue-leaflet";

export default {
  name: "GameView",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 12,
      center: [48.6921, 6.1844],
      markerLatLng: [48.6921, 6.1844],
      maxZoom: 25,
      minZoom: 1,
      targetLocation: {lat: 48.6921, lon: 6.1844}, //generer la target location
      distanceParameter: 0.1,
      popupContent: "",
      score: this.getScore(),
      bestDistance: 100,
      totalAttempts: 2,
      remainingAttempts: 2,
      gameOver: false,
      partie: null,
      items: null,
      extractedData: null,
      currentItemIndex: 0,
      currentAttemptIndex: 0,
      attemptsPerItem: 3,
    };
  },
  async created() {
    await this.getPartie();
    await this.getItems();
    await this.extractLocationAndImage();
  },
  methods: {
    extractLocationAndImage() {
      // Vérifiez si l'objet data est défini
      if (this.items && this.items.Series_by_id && this.items.Series_by_id.Items) {
        // Récupérez le tableau d'items
        const items = this.items.Series_by_id.Items;
        console.log(items[0].image);
        // Parcourez chaque élément et extrayez la localisation et l'image
        this.extractedData = items.map(item => ({
          location: item.coordinates,
          image: item.image
        }));

        // Affichez les données extraites dans la console (facultatif)
        // console.log(extractedData);

        // // Retournez les données extraites (facultatif, selon vos besoins)
        // return extractedData;
      } else {
        console.error('Les données nécessaires ne sont pas définies.');
        // Gérer l'erreur en conséquence
      }
    },
    // nextSequence() {
    //   this.score = this.getScore();
    //   this.bestDistance = 100;
    //   this.remainingAttempts = this.totalAttempts;
    //   this.gameOver = false;
    //   this.popupContent = "";
    //   this.markerLatLng = [this.center[0], this.center[1]];
    //   if (this.currentSequenceIndex < this.extractedData.length) {
    //     this.extractLocationAndImage();
    //   } else {
    //     // Affichez un message indiquant que toutes les séquences ont été terminées
    //     alert("Vous avez terminé toutes les séquences !");
    //     // Réinitialisez currentSequenceIndex à 0
    //
    //     //
    //   }
    // },
    getPartie() {
      const data = window.localStorage.getItem("party");
      const dataJson = JSON.parse(data);
      console.log(dataJson.partie);
      this.partie = dataJson.partie;
      // const response = fetch(`http://localhost:3333/api/series/`);
    },
    async getItems() {
      if (!this.partie) {
        console.error('La partie est indéfinie. Impossible de récupérer les items.');
        return;
      }

      const id = parseInt(this.partie.serie_id);
      const response = await fetch(`http://localhost:3333/api/series/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
      const data = await response.json();
      console.log(data.data);
      this.center = [data.data.Series_by_id.coordinates.coordinates[1], data.data.Series_by_id.coordinates.coordinates[0]];
      this.items = data.data;
    },
    getScore() {
      let data = window.localStorage.getItem("party");
      let dataJson = JSON.parse(data);
      console.log(dataJson.Items);
      return dataJson.partie.score;
    },
    checkDistance() {
      const markerLatLng = L.latLng(this.markerLatLng[0], this.markerLatLng[1]);
      const targetLatLng = L.latLng(this.targetLocation.lat, this.targetLocation.lon);
      const distance = markerLatLng.distanceTo(targetLatLng) / 1000;
      console.log(distance);

      let points = 0;
      if (distance < this.distanceParameter) {
        points = 5;
      } else if (distance < 3 * this.distanceParameter) {
        points = 3;
      } else if (distance < 4 * this.distanceParameter) {
        points = 2;
      } else {
        points = 0;
      }


      this.popupContent = `Vous avez gagné ${points} points !`;

      this.score += points;

      if (distance < this.bestDistance) {
        this.bestDistance = distance;
      }
      if (this.currentAttemptIndex < this.attemptsPerItem - 1) {
        // If we have not reached the maximum number of attempts for this item, increment the attempt index
        this.currentAttemptIndex++;
        this.popupContent += ` Vous avez ${this.attemptsPerItem - this.currentAttemptIndex} tentative(s) restante(s).`;
      } else {
        // If we have reached the maximum number of attempts for this item, reset the attempt index and move on to the next item
        this.currentAttemptIndex = 0;
        this.currentItemIndex++;
        // this.score = this.getScore();
        this.bestDistance = 100;
        this.popupContent = "";
        this.remainingAttempts = this.attemptsPerItem;
        this.gameOver = false;
        this.markerLatLng = [this.center[0], this.center[1]];
        if (this.currentItemIndex < this.extractedData.length) {
          // this.center = [this.extractedData[this.currentItemIndex].location.coordinates[1], this.extractedData[this.currentItemIndex].location.coordinates[0]];
          // this.targetLocation = this.extractedData[this.currentItemIndex].location;
          this.extractLocationAndImage();
        } else {
          // Affichez un message indiquant que toutes les séquences ont été terminées
          alert("Vous avez terminé toutes les séquences ! Votre score est de " + this.score + " points.");
          // Réinitialisez currentSequenceIndex à 0
          this.currentItemIndex = 0;
          this.score = 0;
          this.currentAttemptIndex = 0;
          // ...
        }
      }
    },
    // checkDistance()
    // {
    //   const markerLatLng = L.latLng(this.markerLatLng[0], this.markerLatLng[1]);
    //   const targetLatLng = L.latLng(this.targetLocation.lat, this.targetLocation.lon);
    //   const distance = markerLatLng.distanceTo(targetLatLng) / 1000;
    //   console.log(distance);
    //
    //   let points = 0;
    //   if (distance < this.distanceParameter) {
    //     points = 5;
    //   } else if (distance < 3 * this.distanceParameter) {
    //     points = 3;
    //   } else if (distance < 4 * this.distanceParameter) {
    //     points = 2;
    //   } else {
    //     points = 0;
    //   }
    //
    //   this.popupContent = `Vous avez gagné ${points} points !`;
    //
    //   this.score += points;
    //   if (distance < this.bestDistance) {
    //     this.bestDistance = distance;
    //   }
    //   if (this.remainingAttempts > 0) {
    //     this.popupContent = `Vous avez gagné ${points} points !`;
    //     this.score += points;
    //     if (distance < this.bestDistance) {
    //       this.bestDistance = distance;
    //     }
    //
    //     this.remainingAttempts--;
    //     if (this.remainingAttempts === 0) {
    //       this.gameOver = true;
    //
    //     }
    //   } else {
    //     this.popupContent = "Vous n'avez plus d'essais restants.";
    //     this.nextSequence();
    //   }
    //
    // }
    placeMarker(event) {
      this.markerLatLng = [event.latlng.lat, event.latlng.lng];
    }
    ,
    onMarkerDragEnd(event) {
      this.markerLatLng = [event.target.getLatLng().lat, event.target.getLatLng().lng];
    }
    ,
    resetGame() {
      this.score = 0;
      this.bestDistance = 100;
      this.remainingAttempts = this.totalAttempts;
      this.gameOver = false;
      this.markerLatLng = [this.center[0], this.center[1]];
    }
    ,
    // async createParty() {
    //   const party = {
    //       serie_id: this.series[0].id,
    //       user_email: localStorage.getItem("userEmail"),
    //       item_id: this.item.id,
    //   };
    //   const response = await fetch("http://localhost:3333/api/party",
    //   {
    //   headers: { "Content-Type": "application/json", },
    //   body: JSON.stringify(party),
    //   });
    //   const data = await response.json();
    //   localStorage.setItem("party", JSON.stringify(data.item));
    //   },
    // },
  }
};
</script>


<style scoped>
.mapstyle {
  position: relative;
}

map {
  position: absolute;
}

</style>
