<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";
import userService from "@/services/userService.js";

export default {
  name: 'CreateGroupView',
  data() {
    return {
      group: {},
      condition: false,
    }
  },
  methods: {
    cancelCreate() {
      this.$router.go(-1);
    },
    async createGroup() {
      try {
        const formData = new FormData();
        Object.entries(this.group).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('parliament', this.$store.state.parliamentId);
        if (this.file) {
          formData.append('file', this.file);
        }
        console.log(formData);
        await groupService.createGroup(formData);
        this.$router.go(-1);
        this.$toast.success('Group created!');
      } catch (error) {
        this.$toast.error(error.message);
        console.log(error)
      }
    },
    async isAdminAndParliamentCreated() {
      try {
        const userId = await this.$store.state.userid;
        if (!userId) {
          throw new Error('User ID is not set');
        }
        const user = await userService.getUser(userId);
        const parliament = this.$store.state.parliamentId;
        if (user.role === "admin" && parliament) {
          this.condition = true;
        }
      } catch (error) {
        console.log('Failed to fetch user');
      }
    },
    onFileChange(e) {
      this.file = e.target.files[0];
    },
  },
  mounted() {
    this.$toast = useToast();
    this.isAdminAndParliamentCreated();
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="condition">
        <h2>Create a new group</h2>
        <form @submit.prevent="createGroup">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="group.name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Description" v-model="group.description"></textarea>
            <label for="floatingInput">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input type="color" class="form-control" placeholder="Color" v-model="group.color">
            <label for="floatingInput">Colour</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" placeholder="Seats" v-model="group.seats">
            <label for="floatingInput">Seats</label>
          </div>
          <div class="mb-3">
            <label>Logo</label>
            <input type="file" class="form-control" @change="onFileChange" accept="image/png, image/jpeg">
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelCreate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Create</button>
          </div>
        </form>
      </div>
      <div v-else>
        <BSpinner/>
        <p>Are you allowed to do that?</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>