<script>
import parliamentService from "@/services/parliamentService.js";
import userService from "@/services/userService.js";

export default {
  name: 'ParliamentView',
  data() {
    return {
      parliament: {},
      admin: {},
    };
  },
  methods:{
    async fetchParliament() {
      try {
        if(this.$store.state.parliamentId){
          const parliament = await parliamentService.getParliament(this.$store.state.parliamentId);
          this.parliament = parliament;
        } else {
          this.parliament = {name: "No parliament associated", description: "Join first a group to see the parliament content here."};
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAdmin() {
      try {
        if(this.parliament.admin){
          const admin = await userService.getUser(this.parliament.admin);
          this.admin = admin;
        } else {
          this.parliament.admin = "No admin assigned";
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editParliament() {
      this.$router.push({ name: 'editParliament' });
    },
  },
  mounted() {
    this.fetchParliament().then(() => {
      this.fetchAdmin();
    });
  },
};

</script>

<template>
  <div class="container">
    <div class="startinfo" v-if="parliament">
      <div class="editable">
        <h2>{{parliament.name}}</h2>
        <div style="margin-left: 5rem"><button type="button" class="btn btn-secondary" @click="editParliament">
          Edit
        </button></div>
      </div>
      <h4>{{parliament.description}}</h4>
      <h6 v-if="parliament.location">Localización: <strong>{{parliament.location}}</strong></h6>
      <p v-if="parliament.totalSeats">Escaños: <strong>{{parliament.totalSeats}}</strong></p>
      <p v-if="parliament.admin && admin.role==='admin'">Presidente: <strong>{{admin.surname}}, {{admin.name}}</strong></p>
      <br>
    </div>
    <div v-else>
      <BSpinner />
    </div>
    <div class="opendebates" v-if="admin.role==='admin'">
      <h3>Debates ongoing:</h3>
      <p>In this section you will see the open debates</p>
      {{parliament.debates}}
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.container p:first-of-type {
  margin-bottom: 0.5em; /* Adjust as needed */
}
.container p:last-of-type {
  margin-top: 0.5em; /* Adjust as needed */
}
.editable{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>