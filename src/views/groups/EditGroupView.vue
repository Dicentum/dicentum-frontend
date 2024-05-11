<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";
import userService from "@/services/userService.js";

export default {
  name: 'EditGroupView',
  data() {
    return {
      group: {},
      file: null
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async fetchGroupData() {
      try {
        const id = this.$route.params.id;
        this.group = await groupService.getGroup(id);
      } catch (error) {
        console.error(error);
      }
    },
    cancelUpdate() {
      this.$router.go(-1);
    },
    async updateGroup() {
        try {
          const formData = new FormData();
          Object.entries(this.group).forEach(([key, value]) => {
            if (key !== 'users' && key !== 'requestedUsers') {
              formData.append(key, value);
            }
          });
          if (this.file) {
            formData.append('file', this.file);
          }
          await groupService.updateGroup(this.group._id, formData);
        this.$router.go(-1);
        this.$toast.success('Group updated!');
      } catch (error) {
        this.$toast.error(error.message);
        console.log(error)
      }
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchGroupData();
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="group">
        <h2>Edit Group</h2>
        <br>
        <form @submit.prevent="updateGroup">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="group.name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Description" v-model="group.description"></textarea>
            <label for="floatingInput">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" placeholder="Seats" v-model="group.seats">
            <label for="floatingInput">Seats</label>
          </div>
          <div class="mb-3">
            <label>Logo</label>
            <input type="file" class="form-control" @change="onFileChange" accept="image/png, image/jpeg">
          </div>
          <br>
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelUpdate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Update</button>
          </div>
        </form>
      </div>
      <div v-else>
        <BButton variant="primary" disabled>
          <BSpinner small type="grow" />
          Loading...
        </BButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>