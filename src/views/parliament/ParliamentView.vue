<script>
import parliamentService from "@/services/parliamentService.js";
import userService from "@/services/userService.js";
import DebateSquare from "@/components/DebateSquare.vue";
import groupService from "@/services/groupService.js";
import graph from "@/components/Graph.vue";

export default {
  name: 'ParliamentView',
  components: {DebateSquare, graph},
  data() {
    return {
      parliament: {},
      admin: {},
      currentRole: this.$store.state.userRole,
      createParliament: false,
      groups: [],
      callGraph: false,
      graphData: [],
    };
  },
  methods:{
    async fetchParliament() {
      try {
        if(this.$store.state.parliamentId !== null && this.$store.state.parliamentId !== undefined){
          const parliament = await parliamentService.getParliament(this.$store.state.parliamentId);
          this.parliament = parliament;
        } else {
          if(this.currentRole=='admin'){
            this.createParliament = true;
            this.parliament = {
              name: "No parliament created",
              description: "Create a parliament to start working with it."
            };
          } else {
            this.parliament = {
              name: "No parliament associated",
              description: "Join first a group to see the parliament content here."
            };
          }
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
    async fetchGroups() {
      try {
        if (this.parliament.name !== "No parliament created" && this.parliament.name !== "No parliament associated") {
          let seatsAssigned = 0;
          for (const group of this.parliament.parliamentaryGroups) {
            const groupData = await groupService.getGroup(group);
            this.groups.push(groupData);
            this.graphData.push({seats: groupData.seats, color: groupData.color});
            seatsAssigned += groupData.seats;
          }
          this.graphData.push({seats: this.parliament.totalSeats - seatsAssigned, color: "#6e757c"});
          this.callGraph = true;
        } else {
          this.callGraph = false;
          console.log("No groups to show");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editParliament() {
      this.$router.push({ name: 'editParliament' });
    },
    async createParliamentView() {
      this.$router.push({ name: 'createParliament' });
    },
  },
  mounted() {
    this.fetchParliament().then(() => {
      this.fetchAdmin().then(() => {
        this.fetchGroups();
      });
    });
  },
};

</script>

<template>
  <div class="container">
    <div class="startinfo" v-if="parliament">
      <div class="editable">
        <h2>{{parliament.name}}</h2>
        <div v-if="!createParliament && currentRole=='admin'" style="margin-left: 5rem"><button type="button" class="btn btn-secondary" @click="editParliament">
          Edit
        </button></div>
        <div v-if="createParliament && currentRole=='admin'">
          <button type="button" class="btn btn-primary" @click="createParliamentView">
            Create the parliament
          </button>
        </div>
      </div>
      <h4>{{parliament.description}}</h4>
      <h6 v-if="parliament.location">Localización: <strong>{{parliament.location}}</strong></h6>
      <p v-if="parliament.totalSeats">Escaños: <strong>{{parliament.totalSeats}}</strong></p>
      <p v-if="parliament.admin && admin.role==='admin'">Presidente: <strong>{{admin.surname}}, {{admin.name}}</strong></p>
      <br>
    </div>
    <div v-else class="d-flex">
      <BButton variant="primary" disabled>
        <BSpinner small type="grow" />
        Loading...
      </BButton>
    </div>
    <div class="current-groups" v-if="callGraph && graphData">
      <h3>Current parliament:</h3>
      <graph :data="graphData" :total-seats="parliament.totalSeats" class="graph-parliament"></graph>
    </div>
    <br>
    <div class="opendebates" v-if="admin.role==='admin'">
      <h3>Debates closed:</h3>
      <p>In this section you will see the closed debates</p>
      <DebateSquare class="debate-square" v-for="debate in parliament.debates" :key="debate" :debate="debate" :do-not-display-if-open="true"/>
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
.graph-parliament{
  margin-top: -5px;
}
</style>