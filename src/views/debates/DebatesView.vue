<script>
import parliamentService from "@/services/parliamentService.js";
import userService from "@/services/userService.js";
import DebateSquare from "@/components/DebateSquare.vue";

export default {
  name: 'DebatesView',
  components: {DebateSquare},
  data() {
    return {
      debates: [],
      admin: {},
      parliament: {},
      user: this.$store.state.userid,
    };
  },
  methods:{
    async fetchParliament() {
      try {
        if(this.$store.state.parliamentId){
          const parliament = await parliamentService.getParliament(this.$store.state.parliamentId);
          this.parliament = parliament;
          this.debates = parliament.debates;
        } else {
          this.debates = [{name: "It is not possible to display debates yet", description: "Join first a parliament group to see the debates content here."}];
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAdmin() {
      try {
        if(this.parliament.admin) {
          const admin = await userService.getUser(this.parliament.admin);
          this.admin = admin;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async createDebateView() {
      this.$router.push({ name: 'createDebate' });
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
        <div v-if="this.admin._id == this.user" style="margin-left: 5rem"><button type="button" class="btn btn-primary" @click="createDebateView">
          Create new debate
        </button></div>
      </div>
      <div class="group-container">
        <br>
        <DebateSquare class="debate-square" v-for="debate in debates" :key="debate" :debate="debate"/>
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
.debate-square {
  margin-bottom: 2rem;
}
</style>