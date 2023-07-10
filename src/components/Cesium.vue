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

  <ol class="p-2 list-disc list-inside text-xl text-white">
    <li>{{ projectTitle }}</li>
  </ol>


</template>