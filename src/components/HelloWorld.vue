<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h2>My Cesium Projects</h2>
  <!-- <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 class="underline">
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div> -->
</template>

<style scoped>
h2 {
  font-weight: 1500;
  font-size: 1.6rem;
  /* position: relative; */
  top: -10px;
  width: 100%;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
