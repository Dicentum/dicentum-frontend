<script>
import groupService from "@/services/groupService.js";
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";

export default {
  name: 'EditGroupView',
  data() {
    return {
      group: {},
    }
  },
  methods: {
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
        await groupService.updateGroup(this.group._id, this.group);
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
          <!-- Add the admin field here in the future -->
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelUpdate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Update</button>
          </div>
        </form>
      </div>
      <div v-else>
        <BSpinner />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>