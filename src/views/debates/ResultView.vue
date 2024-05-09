<script>

import debateService from "@/services/debatesService.js";
import {useToast} from "vue-toastification";
import * as d3 from 'd3';
import * as pc from 'd3-parliament-chart';
import graph from "@/components/Graph.vue";

function formatResult(result) {
  const noVotes = result.totalSeats - result.emittedVotes;
  return [
    {"seats": result.affirmativeVotes, "color": "#1a7742"},
    {"seats": result.abstentionVotes, "color": "#f5c344"},
    {"seats": noVotes, "color": "#6e757c"},
    {"seats": result.negativeVotes, "color": "#cb444b"},
  ];
}

export default {
  name: 'ResultView',
  components: { graph },
  data() {
    return {
      debate: null,
      result: null,
      data: [
        {"seats":40,"color":"#1a7742"},
        {"seats":30,"color":"#f5c344"},
        {"seats":5,"color":"#6e757c"},
        {"seats":50,"color":"#cb444b"}
      ],
    }
  },
  methods: {
    async fetchDebateData() {
      try {
        const id = this.$route.params.id;
        this.debate = await debateService.getDebate(id);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchResultData() {
      try {
        const debateId = this.debate._id;
        this.result = await debateService.getResult(debateId);
        this.data = formatResult(this.result);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchDebateData().then(() => {
      this.fetchResultData();
    });
  }
}
</script>

<template>
  <div v-if="debate && result">
    <BBreadcrumb>
      <BBreadcrumbItem @click="this.$router.push({path: '/dashboard'});"> Dashboard </BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debates'});">Debates</BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debateDetails'});">Details</BBreadcrumbItem>
      <BBreadcrumbItem active>Result</BBreadcrumbItem>
    </BBreadcrumb>
    <div class="debate-details">
      <div class="group-info">
        <div class="editable">
          <h2>Results for {{debate.title}}</h2>
          <p>{{debate.description}}</p>
          <p>Seats: {{result.totalSeats}}</p>
          <br>
          <div class="vote-screen">
            <div>
              <p class="yes-votes">
                <span class="icon">☑︎</span>
                <span class="number">{{result.affirmativeVotes}}</span>
              </p>
              <p class="abstain-votes">
                <span class="icon">○</span>
                <span class="number">{{result.abstentionVotes}}</span>
              </p>
              <p class="no-votes">
                <span class="icon">☒</span>
                <span class="number">{{result.negativeVotes}}</span>
              </p>
            </div>
            <p>Emitted votes: <strong>{{result.emittedVotes}}</strong></p>
          </div>
          <graph :data="data"></graph>
        </div>
    </div>
  </div>
  </div>
  <div v-if="!debate">
    <div class="loading-overlay">
      <div class="loading-box">
        <BSpinner class="spinner-loading-class"/> Loading...
      </div>
    </div>
  </div>
  <div v-if="!result">
    <BBreadcrumb>
      <BBreadcrumbItem @click="this.$router.push({path: '/dashboard'});"> Dashboard </BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debates'});">Debates</BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debateDetails'});">Details</BBreadcrumbItem>
      <BBreadcrumbItem active>Result</BBreadcrumbItem>
    </BBreadcrumb>
    <div class="warning-voting">
      <p class="warning-text">⚠︎ The results of this debate are not published yet.</p>
    </div>
  </div>
</template>

<style scoped>
.vote-screen {
  display: flex;
  justify-content: space-between;
  margin-bottom: -30px;
}
.yes-votes .icon {
  color: #1a7742;
  font-size: 1.5em;
}
.yes-votes .number {
  color: black;
  font-size: 1em;
}
.abstain-votes .icon {
  color: #f5c344;
  font-size: 1.5em;
}
.abstain-votes .number {
  color: black;
  font-size: 1em;
}
.no-votes .icon {
  color: #cb444b;
  font-size: 1.5em;
}
.no-votes .number {
  color: black;
  font-size: 1em;
}
.yes-votes .number,
.abstain-votes .number,
.no-votes .number {
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.2em;
}
.warning-voting{
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.warning-text{
  margin-top: 1rem;
  font-size: 1em;
}
</style>