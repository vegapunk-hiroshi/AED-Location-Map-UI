<template>
  <div class="text-white">

    <ol class="p-2 list-disc list-inside text-xl ">
      <!-- <li>{{ projectTitle }}</li> -->
      <!-- <ll>api test: {{ testAPI }}</ll> -->
    </ol>

    <!-- <p>Click anywhere on the map and filter the icons within 10km from the point you clicked.</p> -->
    <button class="text-m border-2 rounded-md p-2 m-1" @click = zoomTo >Zoom to current location</button>
    <div>Current Location: {{ currentLocation }}</div>
  </div>

</template>

<script>
import {initViewer, showKML, zoomToCurrentLocation, addPoint} from '../components/cesium.js'


export default {
  name: 'Cesium',
  props: ['projectTitle', 'testAPI'],
  data() {
    return {
      location: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
      },
      viewer: null
    }
  },
  computed: {
      currentLocation() {
      return `Latitude : ${this.location.latitude}, 
      Longitude: ${this.location.longitude}, 
      More or less ${this.location.accuracy} meters.`
    }
  },
  created() {
    setTimeout(() => {
      const viewer = initViewer();
      viewer.then((viewer) => {
        this.viewer = viewer;
        console.log('Viewer Loaded');
      })}, 100);
  },
  mounted() {
    console.log('mounted')
    this.getCurrentLocation();
  },
  methods: {
    zoomTo() {
      console.log('zoommmm', this.viewer);
      if( this.viewer) {
        zoomToCurrentLocation(this.viewer, this.location);
      }
    },
    async getCurrentLocation() {
      function getPosition(options) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      getPosition(options)
        .then((pos) => {
          const crd = pos.coords;
          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
          this.location = {
            latitude: crd.latitude,
            longitude: crd.longitude,
            accuracy: crd.accuracy
          };
          addPoint(this.viewer, this.location);
        })
        .catch((err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        });

    }
  }
}
</script>
