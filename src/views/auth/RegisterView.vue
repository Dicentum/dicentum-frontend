<script>
import { reactive } from "vue";
import icon from '@/assets/icon_small.svg';
import { useRouter } from "vue-router";
import authService from '@/services/authService.js';
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default {
  name: 'RegisterView',
  setup() {

    const data = reactive({
      email: '',
      password: '',
      repeatPassword: '',
      name: '',
      surname: ''
    });

    const router = useRouter();
    const toast = useToast();

    const submit = async () => {
      try {
        if (data.password !== data.repeatPassword) {
          throw new Error("Passwords do not match");
        }

        const userData = {
          password: data.password,
          email: data.email,
          name: data.name,
          surname: data.surname
        };

        await authService.register(userData);
        toast.success('User registered successfully!');
        await router.push('/login');
      } catch (error) {
        toast.error(error.message);
      }
    };

    return {
      submit,
      data,
      icon
    };
  },
};
</script>

<template>
  <main class="form-signin">
    <div class="container">
      <form @submit.prevent="submit">
        <img class="mb-4" :src="icon" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Please register</h1>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" placeholder="Name" v-model="data.name">
          <label for="floatingInput">Name</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" placeholder="Surname" v-model="data.surname">
          <label for="floatingInput">Surname</label>
        </div>

        <div class="form-floating mb-3">
          <input type="email" class="form-control" placeholder="name@example.com" v-model="data.email">
          <label for="floatingInput">Email address</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="data.password">
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" placeholder="Repeat Password" v-model="data.repeatPassword">
          <label for="floatingPassword">Repeat password</label>
        </div>

        <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-body-secondary">Dicentum 2024</p>
      </form>
    </div>
  </main>
</template>

<style scoped>
.container{
  max-width: 800px;
  padding: 15px;
  margin: auto;
}
</style>
