<template>
  <!-- <img alt="Vue logo" class="pr-6" src="@/assets/logo.svg" width="125" height="125" /> -->
  <!-- <p class="text-3xl font-bold underline"> test test</p> -->

  <div class="bg-cyan-600 p-5">
    <the-header></the-header>
    <the-cesium :project-title='projectTitle'></the-cesium>

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


export default {
  name: 'App',
  data() {
    return {
      projectTitle: "AED locations in Sendai",
    }
  },
  computed: {

  },
  watch: {
  }
}
</script>

