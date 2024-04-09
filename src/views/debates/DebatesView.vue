<script>
import parliamentService from "@/services/parliamentService.js";
import userService from "@/services/userService.js";

export default {
  name: 'DebatesView',
  data() {
    return {
      debates: [],
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
        <h2>Debates</h2>
        <div style="margin-left: 5rem"><button type="button" class="btn btn-primary" @click="">
          Create new debate
        </button></div>
      </div>
    </div>
    <div v-else class="d-flex">
      <BButton variant="primary" disabled>
        <BSpinner small type="grow" />
        Loading...
      </BButton>
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