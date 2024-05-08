<script>
import { useRoute } from 'vue-router';
import groupService from "@/services/groupService.js";
import GroupSquare from "@/components/GroupSquare.vue";
import PersonSquare from "@/components/PersonSquare.vue";
import PersonRequestSquare from "@/components/PersonRequestSquare.vue";
import {useToast} from "vue-toastification";
import fileService from "@/services/fileService.js";
import debateService from "@/services/debatesService.js";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'DebateDetailView',
  components: {},
  data() {
    return {
      debate: null,
      userRole: this.$store.state.userRole,
      onlyMyTimers: false,
      isLoading: false
    };
  },
  created() {
    this.fetchDebateData();
  },
  methods: {
    async tallyVotes() {
      this.isLoading = true;
      try {
        await debateService.doTally(this.debate._id);
        this.isLoading = false;
        this.$toast.success('Votes tallied successfully!');
      } catch (error) {
        this.isLoading = false;
        this.$toast.error(error.message);
        console.error(error);
      }
      await this.fetchDebateData();
    },
    toVoteDebate() {
      this.$router.push({ name: 'voteDebate', params: { id: this.debate._id } });
    },
    showAllTimers() {
      this.onlyMyTimers = !this.onlyMyTimers;
    },
    toResults() {
      this.$router.push({ name: 'resultDebate', params: { id: this.debate._id } });
    },
    async fetchDebateData() {
      try {
        const id = this.$route.params.id;
        this.debate = await debateService.getDebate(id);
      } catch (error) {
        console.error(error);
      }
    },
    async editDebate() {
      this.$router.push({name: 'editDebate'});
    },
    async deleteDebate() {
      try {
        await debateService.deleteDebate(this.debate._id);
        this.$router.push({name: 'debates'});
        this.$toast.success('Debate deleted successfully!');
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return date.toLocaleString('en-UK', options);
    },
    manageTimers() {
      this.$router.push({name: 'manageTimers'});
    }
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>

<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-box">
      <BSpinner class="spinner-loading-class"/> Loading...
    </div>
  </div>
  <div v-if="debate">
    <BBreadcrumb>
      <BBreadcrumbItem @click="this.$router.push({path: '/dashboard'});"> Dashboard </BBreadcrumbItem>
      <BBreadcrumbItem @click="this.$router.push({name: 'debates'});">Debates</BBreadcrumbItem>
      <BBreadcrumbItem active>Details</BBreadcrumbItem>
    </BBreadcrumb>
    <div class="debate-details">
      <div class="group-info">
        <div class="editable">
          <h2>{{debate.title}}</h2>
          <div class="closed-label" v-if="debate.isClosed">Closed</div>
          <div v-if="userRole == 'admin'">
          <BDropdown end text="Options" variant="secondary" class="options-dropdown">
            <BDropdownItem @click="editDebate">Edit</BDropdownItem>
            <BDropdownItem v-if="debate.type === 'presential' && userRole=='admin'" @click="manageTimers">Manage timers</BDropdownItem>
            <BDropdownItem v-if="!debate.isClosed && userRole=='admin' && Date.now() > new Date(debate.endDateVote)" @click="tallyVotes">Tally votes</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem @click="deleteDebate" style="color: firebrick">Delete</BDropdownItem>
          </BDropdown>
          </div>
        </div>
        <h4>{{debate.description }}</h4>
        <br>
        <h6>{{formatDate(debate.date)}}</h6>
        <div :class="{ 'online-pill': debate.type === 'online', 'presential-pill': debate.type === 'presential' }">
          {{ debate.type.toUpperCase() }}
        </div>
        <div class="vote-container">
        <div>
          <div v-if="debate.startDateVote"><strong>Voting opens: </strong>{{ formatDate(debate.startDateVote) }}</div>
          <div v-if="debate.endDateVote"><strong>Voting closes: </strong>{{ formatDate(debate.endDateVote) }}</div>
        </div>
          <div>
            <div v-if="!debate.isClosed && Date.now() > new Date(debate.startDateVote) && Date.now() < new Date(debate.endDateVote)">
              <BButton size="lg" variant="primary" @click="toVoteDebate">Vote</BButton>
            </div>
            <div v-else>
              <BButton size="lg" variant="info" @click="toResults">Results</BButton>
            </div>
          </div>
        </div>
        <div class="filters-container">
          <h4>Timers: </h4>
          <div class="filters">
            <div v-if="onlyMyTimers==true">
              <BButton size="sm" pill variant="outline-secondary" @click="showAllTimers">All the timers</BButton>
            </div>
            <div v-else>
              <BButton size="sm" pill variant="outline-primary" @click="showAllTimers">Only my timer</BButton>
            </div>
          </div>
          </div>
        <div class="timers">
          <div v-if="debate.timers && debate.timers.length">
            <div v-if="onlyMyTimers">
              <TimerSquare v-for="timer in debate.timers" :key="timer" :timer="timer" :onlyMyTimers="true" class="timer-container"/>
            </div>
            <div v-else>
            <TimerSquare v-for="timer in debate.timers" :key="timer" :timer="timer" class="timer-container"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <BButton variant="primary" disabled>
      <BSpinner small type="grow" />
      Loading...
    </BButton>
  </div>
</template>

<style scoped>
.group-details {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.group-info {
  flex: 1;
}

.editable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.options-dropdown {
  margin-left: auto;
}
.closed-label {
  background-color: firebrick;
  color: white;
  padding: 5px;
  border-radius: 25px;
  font-size: 0.8em;
  margin-left: auto;
  margin-right: 10px;
}
.online-pill, .presential-pill {
  display: inline-block;
  padding: 5px;
  border-radius: 25px;
  font-size: 0.6em;
  margin-top: 5px;
  margin-bottom: 10px;
}
.online-pill {
  background-color: darkslateblue;
  color: white;
}
.presential-pill {
  background-color: mediumseagreen;
  color: white;
}
.timer-container {
  margin-bottom: 2rem;
}
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}
.timers{
  margin-top: 2rem;
}
.vote-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

