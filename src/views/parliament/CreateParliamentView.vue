<script>
import parliamentService from "@/services/parliamentService.js";
import {useToast} from "vue-toastification";

export default {
  name: 'CreateParliamentView',
  data() {
    return {
      parliament: {},
    }
  },
  methods: {
    cancelCreate() {
      this.$router.go(-1);
    },
    async fetchParliament() {
      try {
        if(this.$store.state.parliamentId){
          this.parliament = await parliamentService.getParliament(this.$store.state.parliamentId);
        } else {
          this.parliament = {name: "No parliament associated", description: "Join first a group to see the parliament content here."};
        }
      } catch (error) {
        console.error(error);
      }
    },
    async createParliament() {
      try {
        await parliamentService.createParliamentiament(this.parliament);
        this.$router.push({ name: 'parliament' });
        this.$toast.success('Parliament created!');
      } catch (error) {
        this.$toast.error(error.message);
      }
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchParliament();
  }
};
</script>

<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="parliament">
        <h2>Create the Parliament</h2>
        <form @submit.prevent="createParliament">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Name" v-model="parliament.name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Description" v-model="parliament.description"></textarea>
            <label for="floatingInput">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="Location" v-model="parliament.location">
            <label for="floatingInput">Location</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" placeholder="Seats" v-model="parliament.totalSeats">
            <label for="floatingInput">Seats</label>
          </div>
          <!-- Add the admin field here in the future -->
          <div class="d-flex justify-content-between">
            <button class="btn btn-secondary w-45 py-2" type="button" @click="cancelCreate">Cancel</button>
            <button class="btn btn-primary w-45 py-2" type="submit">Create</button>
          </div>
        </form>
      </div>
      <div v-else>
        <BSpinner />
      </div>
    </div>
  </div>
</template>

<style>
.w-45 {
  width: 45% !important;
}
</style>