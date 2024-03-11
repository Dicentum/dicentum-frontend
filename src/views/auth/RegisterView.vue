<script>
import { reactive, computed, ref } from "vue";
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

    const isLengthValid = computed(() => data.password.length >= 8);
    const hasUppercase = computed(() => /[A-Z]/.test(data.password));
    const hasLowercase = computed(() => /[a-z]/.test(data.password));
    const hasDigit = computed(() => /\d/.test(data.password));

    const passwordTouched = ref(false);
    const repeatPasswordTouched = ref(false);
    const doesNotMatch = computed(() => data.password !== data.repeatPassword);

    const submit = async () => {
      try {
        if (!isLengthValid.value || !hasUppercase.value || !hasLowercase.value || !hasDigit.value) {
          toast.error('Password does not meet the requirements');
          throw new Error('Password does not meet the requirements');
        }
        if (doesNotMatch.value) {
          toast.error('Passwords do not match');
          throw new Error('Passwords do not match');
        }

        const userData = {
          password: data.password,
          email: data.email,
          name: data.name,
          surname: data.surname
        };

        const register = await authService.register(userData);
        toast.success('User registered successfully!');
        await router.push(`/validate/${register.id}`);
      } catch (error) {
        toast.error(error.message);
      }
    };

    return {
      submit,
      data,
      icon,
      isLengthValid,
      hasUppercase,
      hasLowercase,
      hasDigit,
      doesNotMatch,
      repeatPasswordTouched,
      passwordTouched
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
          <input type="password" class="form-control" placeholder="Password" v-model="data.password" @keydown="passwordTouched = true">
          <label for="floatingPassword">Password</label>
          <div class="password-indicator" v-if="passwordTouched">
            <div>
              <span :class="{ 'valid': isLengthValid }" v-if="isLengthValid">✓ </span><span v-else>✕ </span>
              <span :class="{ 'valid': isLengthValid }">8 characters long</span>
            </div>
            <div>
              <span :class="{ 'valid': hasUppercase }" v-if="hasUppercase">✓ </span><span v-else>✕ </span>
              <span :class="{ 'valid': hasUppercase }">Contains an uppercase letter</span>
            </div>
            <div>
              <span :class="{ 'valid': hasLowercase }" v-if="hasLowercase">✓ </span><span v-else>✕ </span>
              <span :class="{ 'valid': hasLowercase }">Contains a lowercase letter</span>
            </div>
            <div>
              <span :class="{ 'valid': hasDigit }" v-if="hasDigit">✓ </span><span v-else>✕ </span>
              <span :class="{ 'valid': hasDigit }">Contains a digit</span>
            </div>
          </div>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" placeholder="Repeat Password" v-model="data.repeatPassword" @keydown="repeatPasswordTouched = true">
          <label for="floatingPassword">Repeat password</label>
          <div class="password-indicator" v-if="repeatPasswordTouched">
            <div>
              <span :class="{ 'valid': !doesNotMatch }" v-if="!doesNotMatch">✓ </span><span v-else>✕ </span>
              <span :class="{ 'valid': !doesNotMatch }">The passwords match</span>
            </div>
          </div>
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
.password-indicator span {
  color: red;
}

.password-indicator span.valid {
  color: green;
}
</style>
