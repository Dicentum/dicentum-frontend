<script>
import { useRoute } from 'vue-router';
import groupService from "@/services/groupService.js";
import GroupSquare from "@/components/GroupSquare.vue";
import PersonSquare from "@/components/PersonSquare.vue";
import PersonRequestSquare from "@/components/PersonRequestSquare.vue";
import {useToast} from "vue-toastification";
import fileService from "@/services/fileService.js";
import debateService from "@/services/debatesService.js";
import MessageSquare from "@/components/MessageSquare.vue";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'DebateDetailView',
  components: {MessageSquare},
  data() {
    return {
      debate: null,
      userRole: this.$store.state.userRole,
      onlyMyTimers: false,
      isLoading: false,
      timeToVote: false,
      timeToResults: false,
      timeToTally: false,
      now: null,
      message: '',
      messages: [],
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

        const now = new Date();
        const start = new Date(this.debate.startDateVote);
        const end = new Date(this.debate.endDateVote);

        this.timeToVote = now > start && new Date(now) < end && !this.debate.isClosed;
        this.timeToResults = now > start && this.debate.isClosed;
        this.timeToTally = now > end && !this.debate.isClosed && this.userRole == 'admin';
      } catch (error) {
        console.error(error);
      }
    },
    async sendMessage() {
      try {
        await debateService.sendMessage(this.debate._id, this.message);
        this.$toast.success('Message sent successfully!');
        this.message = '';
        await this.getMessages();
      } catch (error) {
        console.error(error);
        if(error.response.status === 400 && this.debate.isClosed){
          this.$toast.error('This debate is closed');
        }
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
    async getMessages() {
      try {
        const messages = await debateService.getMessages(this.$route.params.id);
        this.messages = messages;
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
        hour12: false,
      };
      return date.toLocaleString('en-UK', options);
    },
    manageTimers() {
      this.$router.push({name: 'manageTimers'});
    }
  },
  mounted() {
    this.$toast = useToast();
    this.getMessages();
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
            <BDropdownItem v-if="timeToTally" @click="tallyVotes">Tally votes</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem @click="deleteDebate" style="color: firebrick">Delete</BDropdownItem>
          </BDropdown>
          </div>
        </div>
        <h4>{{debate.description }}</h4>
        <br>
        <h6>{{formatDate(new Date(debate.date))}}</h6>
        <div :class="{ 'online-pill': debate.type === 'online', 'presential-pill': debate.type === 'presential' }">
          {{ debate.type.toUpperCase() }}
        </div>
        <div class="vote-container">
        <div>
          <div v-if="debate.startDateVote"><strong>Voting opens: </strong>{{formatDate( new Date(debate.startDateVote)) }}</div>
          <div v-if="debate.endDateVote"><strong>Voting closes: </strong>{{formatDate( new Date(debate.endDateVote) ) }}</div>
        </div>
          <div>
            <div v-if="timeToVote">
              <BButton size="lg" variant="primary" @click="toVoteDebate">Vote</BButton>
            </div>
            <div v-if="timeToResults">
              <BButton size="lg" variant="info" @click="toResults">Results</BButton>
            </div>
          </div>
        </div>
        <div class="filters-container" v-if="debate.type === 'presential'">
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
        <div class="timers" v-if="debate.type === 'presential'">
          <div v-if="debate.timers && debate.timers.length">
            <div v-if="onlyMyTimers">
              <TimerSquare v-for="timer in debate.timers" :key="timer" :timer="timer" :onlyMyTimers="true" class="timer-container"/>
            </div>
            <div v-else>
            <TimerSquare v-for="timer in debate.timers" :key="timer" :timer="timer" class="timer-container"/>
            </div>
          </div>
        </div>
        <div class="messages-container" v-if="debate.type === 'online'">
          <h4>Messages: </h4>
          <div v-if="messages && messages.length" class="messages-texts">
            <MessageSquare v-for="message in messages" :key="message" :user-id="message.user" :content="message.content" :date="message.createdAt"/>
          </div>
          <div class="fixed-input-group">
            <BInputGroup>
              <BFormInput placeholder="Type your message here" v-model="message" @keyup.enter="sendMessage"/>
              <BInputGroupAppend>
                <BButton variant="success" @click="sendMessage" >✉️ Send</BButton>
              </BInputGroupAppend>
            </BInputGroup>
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
.messages-container{
  margin-top: 2rem;
}
.messages-texts{
  margin-top: 2rem;
}
.fixed-input-group {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: content-box;
  background: white;
  margin-top: -0.5rem;
  margin-bottom: 2rem;
}
</style>

