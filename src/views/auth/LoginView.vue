<script>
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import authService from '@/services/authService.js';
import icon from '@/assets/icon_small.svg'
import router from "@/router/index.js";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      icon: icon,
      isLoading: false
    };
  },
  methods: {
    async loginUser() {
      this.isLoading = true;
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        await authService.login(credentials);
        this.$store.dispatch('fetchUserProfile');
        this.isLoading = false;
        this.$toast.success('Login successful!');
        await router.push('/dashboard');
      } catch (error) {
        this.isLoading = false;
        this.$toast.error(error.message);
      }
    }
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>

<template>
  <main class="form-signin">
    <div class="form-container">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-box">
          <BSpinner class="spinner-loading-class"/> Loading...
        </div>
      </div>
        <form @submit.prevent="loginUser">
          <img class="mb-4" :src="icon" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Please login</h1>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="name" v-model="username">
            <label for="floatingInput">Username</label>
          </div>

          <div class="form-floating mb-3">
            <input type="password" class="form-control" placeholder="Password" v-model="password">
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
          <p class="mt-5 mb-3 text-body-secondary">Dicentum 2024</p>
        </form>
      </div>
  </main>
</template>

<style scoped>
.form-container{
  max-width: 800px;
  padding: 15px;
  margin: auto;
}
</style>