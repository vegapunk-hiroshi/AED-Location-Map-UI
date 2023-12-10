<template>
  <div class="text-white">

    <ol class="p-2 list-disc list-inside text-xl ">
    </ol>

    <div class="grid grid-flow-col justify-stretch">
      <div>
        <button class="text-m border-2 rounded-md p-2 m-1" @click = zoomTo >Zoom to current location</button>
        <button class="text-m border-2 rounded-md p-2 m-1" @click = guideToAED >Show the path to the closest AED</button>
      </div>
      <div class="pt-2 text-xl">Current Location: {{ currentLocation }}</div>
    </div>
  </div>

</template>

<script>
import {initViewer, showKml, zoomToCurrentLocation, showPathToAED} from '../components/cesium.js'
import { Cartesian3 } from 'cesium'

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
    this.viewer = initViewer();
    this.viewer.then((viewer) => {
      showKml(viewer).then(() => {
        console.log('Zoomed');
      });
    });
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    zoomTo() {
      this.viewer.then((viewer) => {
        zoomToCurrentLocation(viewer, this.location);
      });
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
          this.location = {
            latitude: crd.latitude,
            longitude: crd.longitude,
            accuracy: crd.accuracy
          };
          this.viewer.entities.add({
              position: Cartesian3.fromDegrees(crd.longitude, crd.latitude),
              point: {
                  pixelSize: 50,
                  color: Color.GREEN
              }
          });

        })
        .catch((err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        });
    },
    guideToAED() {
      this.viewer.then((viewer) => {
        showPathToAED(viewer, this.location);
      }).catch((e)=>console.log(e));
    }
  }
}
</script>
