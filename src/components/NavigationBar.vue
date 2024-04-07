<script>
import logo from '@/assets/icon_op.png'
import defaultUser from '@/assets/usericons/default.png'
import router from "@/router/index.js";
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import authService from "@/services/authService.js";
import fileService from "@/services/fileService.js";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'NavigationBar',
  data() {
    return {
      logo: logo,
      defaultUser: defaultUser,
      apiURL: API_URL,
      image: null,
      showImage: false
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    email() {
      return this.$store.state.email;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    name() {
      return this.$store.state.name;
    },
    surname() {
      return this.$store.state.surname;
    },
    photo() {
      return this.$store.state.photo;
    }
  },
  methods: {
    closeNavbar() {
      this.$refs.navbarCollapse.classList.remove('show');
    },
    logout(){
      this.$store.dispatch('logOut');
      router.push('/');
      if (this.$store.state.loggedIn === false) {
        this.$toast.info('Logout successful!');
      } else {
        this.$toast.error('Logout failed!');
      }
    },
    async fetchImage() {
      try {
        if (this.photo) {
          const imageData = await fileService.getImageData(this.photo);
          console.log(imageData);
          this.image = imageData.filename;
          this.showImage = true;
        }
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      }
    },
  },
  mounted() {
    this.$toast = useToast();
    if (this.photo !== 'undefined') {
      this.fetchImage();
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
    <div class="container-fluid">
      <router-link v-if="loggedIn" class="navbar-brand" :to="{name:'dashboard'}"><img :src="logo" alt="Dicentum" width="150" height="" class="d-inline-block align-content-top">
      </router-link>
      <router-link v-else class="navbar-brand" :to="{name:'home'}"><img :src="logo" alt="Dicentum" width="150" height="" class="d-inline-block align-content-top">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse" ref="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
        </ul>
        <div v-if="loggedIn">
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
              <div v-if="showImage">
                <img :src="apiURL+'/files/'+image" alt="" width="32" height="32" class="rounded-circle me-2">
              </div>
              <div v-else>
                <img :src="defaultUser" alt="" width="32" height="32" class="rounded-circle me-2">
              </div>
              <strong>{{ surname }}</strong>, {{ name }}
            </a>
            <ul class="dropdown-menu text-small shadow dropdown-menu-right">
              <li><a class="dropdown-item">{{ username }}</a></li>
              <li><a class="dropdown-item">{{ email }}</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" :to="{name: 'profile'}">Profile</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" style="color: firebrick" @click="logout">Sign out</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
        <form class="d-flex gx-1" role="auth">
          <div class="btn1">
            <router-link :to="{name: 'login'}">
              <button type="button" class="btn btn-outline-primary" @click="closeNavbar">Log in</button>
            </router-link>
          </div>
          <div class="separador"></div>
          <div class="btn2">
            <router-link :to="{name: 'register'}">
              <button type="button" class="btn btn-outline-secondary" @click="closeNavbar">Register</button>
            </router-link>
          </div>
        </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.separador{
  width: 10px;
}
.navbar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.dropdown-menu-right {
  right: auto;
  left: auto;
}
</style>