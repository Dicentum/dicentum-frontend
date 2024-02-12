<script>
import logo from '@/assets/icon_small.svg'
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavigationBar',
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.state.loggedIn);

    return {
      logo
    }
  },
  methods: {
    closeNavbar() {
      this.$refs.navbarCollapse.classList.remove('show');
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name:'home'}"><img :src="logo" alt="Dicentum" width="30" height="" class="d-inline-block align-content-top">
        Dicentum
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" ref="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}" @click="closeNavbar">Home</router-link>
          </li>
        </ul>
        <form class="d-flex gx-1" role="auth">
          <div class="btn1">
            <router-link :to="{name: 'login'}">
              <button type="button" class="btn btn-primary" @click="closeNavbar">Log in</button>
            </router-link>
          </div>
          <div class="separador"></div>
          <div class="btn2">
            <router-link :to="{name: 'register'}">
              <button type="button" class="btn btn-secondary" @click="closeNavbar">Register</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.separador{
  width: 10px;
}
</style>