<template>
  <div class="text-white">
    <div class="grid grid-flow-col justify-stretch">
      <div>
        <!-- <button class="text-xl border-2 rounded-md p-2 m-2 hover:bg-sky-700" @click = zoomTo >
          Zoom to current location
        </button> -->
        <!-- <button class="text-xl border-2 rounded-md p-2 m-2 hover:bg-sky-700" @click = pickLocation >
          Pick location on the map
        </button> -->
        <button class="text-xl border-2 rounded-md p-2 m-2 hover:bg-sky-700" @click = guideToAED >
          Show the path to the closest AED
        </button>
      </div>
      <div class="">
        <div class="border-2 p-2 text-xl">Current Location</div>
        <div>Longitude: {{ currentLocation.longitude || 0 }} </div>
        <div>Latitude: {{ currentLocation.latitude || 0 }} </div>
        <div>Accuracy: {{ currentLocation.accuracy || 0 }} </div>
      </div>
    </div>
  </div>
</template>

<script>
import {initViewer, showPoints, showPathToAED, pickLocationMap} from '../components/cesium.js'
import { Cartesian3, Color,  } from 'cesium';

export default {
  name: 'Cesium',
  // props: ['projectTitle'],
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
        return this.location
      }
  },
  created() {
    this.viewer = initViewer();

    this.viewer.then((viewer) => {

      showPoints(viewer).then(() => {
        console.log('Zoomed');
      });

      pickLocationMap(viewer, this.location);
    });
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    pickLocation() {
      this.viewer.then((viewer)=>{
        if(viewer) {
          const pickedPos = pickLocationMap(viewer);
          console.log('pos', pickedPos)
        }
      });
    },
    zoomTo() {
      this.viewer.then((viewer) => {
        zoomToCurrentLocation(viewer, this.location);
      });
    },
    guideToAED() {
      this.viewer.then((viewer) => {
        showPathToAED(viewer, this.location);
      }).catch((e)=>console.log(e));
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

          this.viewer.then((viewer) => {
            viewer.entities.add({
                position: Cartesian3.fromDegrees(crd.longitude, crd.latitude),
                point: {
                    pixelSize: 50,
                    color: Color.ORANGE
                }
            });
          });
        })
        .catch((err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        });
    },
  }
}
</script>
