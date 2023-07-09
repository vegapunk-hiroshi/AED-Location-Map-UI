<script setup>
import cesiumViewer from '../components/cesium.js'

cesiumViewer().then(()=>console.log('cesium loading success'));

defineProps({
  projectTitle: {
    type: String,
    required: true
  }
})
</script>

<template>

  <ol class="list-disc list-inside text-xl">
    <li>{{ projectTitle }}</li>
  </ol>


</template>