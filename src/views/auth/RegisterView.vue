<script>
import {reactive} from "vue";
import icon from '@/assets/icon_small.svg'
import {useRouter} from "vue-router";

export default {
  name: 'AuthView',
  setup() {

    const data = reactive({
      user: '',
      email: '',
      password: ''
    })

    const router = useRouter()
    const submit = async () => {
      try {
        const userData = {
          username: this.username,
          password: this.password
        };
        await authService.register(userData);
        alert('User registered successfully!');
      } catch (error) {
        alert(error.message);
      }
    }
    return {
      submit, data, icon
    }
  },
}
</script>

<template>
  <main class="form-signin">
    <div class="container">
      <form @submit.prevent="submit">
        <img class="mb-4" :src="icon" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Please register</h1>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" placeholder="name" v-model="data.user">
          <label for="floatingInput">Username</label>
        </div>

        <div class="form-floating mb-3">
          <input type="email" class="form-control" placeholder="name@example.com"  v-model="data.email">
          <label for="floatingInput">Email address</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="data.password">
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