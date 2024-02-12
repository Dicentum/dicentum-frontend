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
      icon: icon
    };
  },
  methods: {
    async loginUser() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch("logIn",this.username);
        await authService.login(credentials);
        this.$toast.success('Login successful!');
        await router.push('/dashboard');
      } catch (error) {
        this.$toast.error(error.message);
      }
    }
  },
  mounted() {
    this.$toast = useToast(); // Initialize toast instance on component mount
  }
};
</script>

<template>
  <main class="form-signin">
    <div class="container">
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
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
      </form>
    </div>
  </main>
</template>

<style scoped>

</style>