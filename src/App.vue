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
        <div class="sidebar-im">
        <Sidebar />
        </div>
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
  display: grid;
  margin-left: 275px;
}
.layout {
  display: flex;
}
.webcontent {
  padding-top: 80px;
  flex: 1;
}

@media (max-width: 770px) {
  .sidebar-im {
    display: none;
  }
  .layout_side {
    margin-left: 0;
  }
}
</style>