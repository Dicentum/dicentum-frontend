<script>
import { RouterView } from 'vue-router'
import NavigationBar from "@/components/NavigationBar.vue";
import Sidebar from "@/components/SideBar.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  name: 'App',
  components: {
    NavigationBar,
    Sidebar,
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
}
</script>

<template>
  <main class="container">
    <div class="layout_side" v-if="loggedIn">
      <div>
        <Sidebar />
        <div class="webcontent">
          <NavigationBar />
          <RouterView />
        </div>
      </div>
    </div>
    <div class="layout" v-else>
      <div class="webcontent">
        <NavigationBar />
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.layout_side {
  display: flex;
  margin-left: 25%;
  margin-right: -40%;
}
.layout {
  display: flex;
}
.webcontent {
  margin-top: 80px;
  width: 100%;
  flex: 1;
}
</style>