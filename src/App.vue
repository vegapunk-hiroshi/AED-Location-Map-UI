<template>
  <!-- <img alt="Vue logo" class="pr-6" src="@/assets/logo.svg" width="125" height="125" /> -->
  <!-- <p class="text-3xl font-bold underline"> test test</p> -->

  <div class="bg-cyan-600 p-5">
    <the-header></the-header>
    <the-cesium :project-title='projectTitle' :test-api="testAPI"></the-cesium>

  </div>
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
<!-- <RouterView /> -->
</template>

<script>
import TheCesium from './components/TheCesium.vue'
import TheHeader from './components/TheHeader.vue'
import axios from "axios";


export default {
  name: 'App',
  data() {
    return {
      projectTitle: "AED locations in Sendai",
      testAPI: {
        type: Number,
      }
    }
  },
  computed: {
    testAPI() {
      return 3 ? 'Hello' : 'World'
    }
  },
  
  created() {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000'
    });


    // Use the instance to send requests
    // instance.get('/items/foo').then(response => {
    //   console.log('API request result', response.data);
    //   this.testAPI = response.data;
    // });

  },
  watch: {
    testAPI: {
      deep: true
    }
  }
}
// import './style.css';




// defineProps({
//   projectList: {
//     type: String,
//     required: true,
//   },
//   testAPI: {
//     type: Number
//   }
// })
</script>

