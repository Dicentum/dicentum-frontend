<script>
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import authService from '@/services/authService.js';
import icon from '@/assets/icon_small.svg'
import router from "@/router/index.js";

export default {
  name: 'ValidateView',
  data() {
    return {
      verification: '',
      icon: icon
    };
  },
  methods: {
    validateInput() {
      this.verification = this.verification.replace(/\D/g, '');
    },
    async validateUser() {
      try {
        if (this.verification.length < 6) {
          this.$toast.error('Please enter a valid code');
        } else {
          await authService.validate(this.$route.params.id, { verification: this.verification });
          this.$toast.success('Account verified!');
          await router.push('/login');
        }
      } catch (error) {
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
      <form @submit.prevent="validateUser">
        <img class="mb-4" :src="icon" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Verify your account</h1>
        <p>
          We have sent a 6-digit code to your email. Please enter it here to verify your account.
        </p>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" placeholder="name" v-model="verification" @input="validateInput" maxlength="6" style="height: 100px; font-size: 40px; font-family: 'Microsoft Sans Serif',sans-serif">
          <label for="floatingInput">Code</label>
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