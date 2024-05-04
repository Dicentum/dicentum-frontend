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
    };
  },
  created() {
    this.fetchDebateData();
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
  <div v-if="debate">
    <div class="debate-details">
      <div class="group-info">
        <div class="editable">
          <h2>{{debate.title}}</h2>
          <div class="closed-label" v-if="debate.isClosed">Closed</div>
          <div v-if="userRole == 'admin'">
          <BDropdown end text="Options" variant="secondary" class="options-dropdown">
            <BDropdownItem @click="editDebate">Edit</BDropdownItem>
            <BDropdownItem v-if="debate.type === 'presential'" @click="manageTimers">Manage timers</BDropdownItem>
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
        <div>
          <div v-if="debate.startDateVote"><strong>Voting opens: </strong>{{ formatDate(debate.startDateVote) }}</div>
          <div v-if="debate.endDateVote"><strong>Voting closes: </strong>{{ formatDate(debate.endDateVote) }}</div>
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
  margin-left: auto; /* Pushes the dropdown to the right */
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
  display: inline-block; /* Add this line */
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
</style>

