<script>

import debateService from "@/services/debatesService.js";
import {useToast} from "vue-toastification";

export default {
  name: 'VotingView',
  data() {
    return {
      debate: null,
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
    async vote(vote){
      try {
        await debateService.submitVote(this.debate._id, {vote});
        this.$toast.success('Vote emitted successfully!');
      } catch (error) {
        console.error(error);
        this.$toast.error(error.message);
      }
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchDebateData();
  }
}
</script>

<template>
  <div v-if="debate">
    <BBreadcrumb>
      <BBreadcrumbItem @click="this.$router.push({path: '/dashboard'});"> Dashboard </BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debates'});">Debates</BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debateDetails'});">Details</BBreadcrumbItem>
      <BBreadcrumbItem active>Vote</BBreadcrumbItem>
    </BBreadcrumb>
    <div class="debate-details">
      <div class="group-info">
        <div class="editable">
          <h2>Voting in {{debate.title}}</h2>
          <p>{{debate.description}}</p>
          <p class="justified-text">{{debate.votingDescription}}</p>
          <br>
          <div class="row mb-3" v-if="debate.isClosed === false && Date.now() > new Date(debate.startDateVote) && Date.now() < new Date(debate.endDateVote)">
            <p>Please vote using the buttons below:</p>
            <p class="info-text">ⓘ You will need your personal PassKey in order to emit a vote</p>
            <div class="col-4">
              <BButton size="lg" variant="success" class="w-100" @click="vote('yes')">Yes</BButton>
            </div>
            <div class="col-4">
              <BButton size="lg" variant="warning" class="w-100" @click="vote('abstain')">Abstain</BButton>
            </div>
            <div class="col-4">
              <BButton size="lg" variant="danger" class="w-100" @click="vote('no')">No</BButton>
            </div>
        </div>
          <div v-else class="warning-voting">
            <p class="warning-text">⚠︎ The voting for this debate has closed.</p>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
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
.info-text{
  color: #8c8b8b;
}
.justified-text {
  text-align: justify;
  white-space: pre-line;
}
</style>