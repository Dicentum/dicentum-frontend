<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link" exact active-class="router-link-active" exact-active-class="router-link-exact-active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" exact active-class="router-link-active" exact-active-class="router-link-exact-active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/groups" class="nav-link" exact active-class="router-link-active" exact-active-class="router-link-exact-active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Parliamentary Group
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/parliament" class="nav-link" exact active-class="router-link-active" exact-active-class="router-link-exact-active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Parliament
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/debates" class="nav-link" exact active-class="router-link-active" exact-active-class="router-link-exact-active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Debates
        </router-link>
      </li>
    </ul>
    <div class="clock mt-auto">
      <strong>{{ currentTime }}</strong>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  position: fixed;
  left: 0;
  top: 20px;
  width: 280px;
  height: 100vh;
}
.clock {
  margin-top: auto;
  padding: 10px;
  text-align: center;
  font-size: 1.25rem;
}
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #fff;
  background-color: #007bff;
}
.nav-link.router-link-active:hover,
.nav-link.router-link-exact-active:hover {
  background-color: #007bff;
  color: #fff;
}
.nav-link {
  color: #000;
}
.nav-link:hover {
  background-color: #e9ecef;
}
</style>


