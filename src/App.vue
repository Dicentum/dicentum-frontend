<script>
import { RouterView } from 'vue-router'
import NavigationBar from "@/components/NavigationBar.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<template>
  <main class="container">
  <NavigationBar />
    <div class="webcontent">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.webcontent{
  margin-top: 80px;
}
</style>
