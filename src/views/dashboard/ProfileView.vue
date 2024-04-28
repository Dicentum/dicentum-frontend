<script>
import userService from "@/services/userService.js";
import {useToast} from "vue-toastification";
import logo from '@/assets/passkeys-logo.png';
import authService from "@/services/authService.js";

export default {
  name: 'ProfileView',
  data() {
    return {
      user: {},
      icon: logo,
    };
  },
  methods:{
    cancelUpdate() {
      this.$router.go(-1);
    },
    async fetchUser() {
      try {
        const user = await userService.getUser(this.$store.state.userid);
        this.user = user;
      } catch (error) {
        console.error(error);
      }
    },
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async updateProfile() {
      try {
        const formData = new FormData();
        Object.entries(this.user).forEach(([key, value]) => {
          formData.append(key, value);
        });
        if (this.file) {
          formData.append('file', this.file);
        }
        await userService.updateUser(this.user._id, formData);
        this.$router.push({ name: 'dashboard' });
        this.$toast.success('Profile updated! All the changes will be visible in the next login.');
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      }
    },
    async enablePassKey() {
      try {
        await authService.registerKey();
        this.$router.push({ name: 'dashboard' });
        this.$toast.success('PassKey enabled!');
      } catch (error) {
        console.error(error);
        this.$toast.error(error.message);
      }
    },
    async testPassKey() {
      try {
        await authService.loginKey();
        this.$toast.success('PassKey is working correctly!');
      } catch (error) {
        console.error(error);
        this.$toast.error(error.message);
      }
    },
  },
  mounted() {
    this.fetchUser();
    this.$toast = useToast();
  },
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="user">
        <h2>Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="user.name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="user.surname">
            <label for="floatingInput">Surname</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="user.description">
            <label for="floatingInput">Description</label>
          </div>
          <div class="mb-3">
            <label>Profile picture</label>
            <input type="file" class="form-control" @change="onFileChange" accept="image/png, image/jpeg">
          </div>
          <!-- Add the admin field here in the future -->
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelUpdate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Update</button>
          </div>
        </form>
        <div v-if="user.passkeys && user.passkeys.length > 0" class="py-5">
          <label>The PassKey is currently enabled for this account. You can test it here:</label>
          <br>
          <br>
          <BButton block variant="dark" @click="testPassKey">
            <img class="logo-icon" src="@/assets/verified.png" alt="Passkeys Logo" width="24" height="24">
            Test PassKey
          </BButton>
        </div>
        <div v-else class="py-5">
          <label>You can enable your passkey here to be able to vote securely:</label>
          <br>
          <br>
          <BButton block variant="dark" @click="enablePassKey">
            <img class="logo-icon" src="@/assets/passkeys-logo.png" alt="Passkeys Logo" width="24" height="24">
            Enable PassKey
          </BButton>
        </div>
      </div>
      <div v-else>
        <BSpinner />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>