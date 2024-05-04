<script>
import { useToast } from "vue-toastification";
import userService from "@/services/userService.js";
import debateService from "@/services/debatesService.js";
import groupService from "@/services/groupService.js";
import { ref } from "vue";
import parliamentService from "@/services/parliamentService.js";
import timerService from "@/services/timerService.js";

export default {
  name: 'ManageTimersView',
  components: {},
  data() {
    return {
      debate: {},
      modal: ref(false),
      endTime: null,
      timer: {},
      parliament: {},
      groups: [],
      selectedGroup: null,
      users: [],
      selectedUser: null,
    }
  },
  methods: {
    async submitForm() {
      const formatEndDate = (date) => {
        // Get the local year, month, day, hours, and minutes
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Construct the date string in YYYY-MM-DDTHH:MM format
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      const startTime = new Date(this.timer.start);
      const endTimeParts = this.endTime.split(':');

      const endDateTime = new Date(startTime);
      endDateTime.setHours(endTimeParts[0]);
      endDateTime.setMinutes(endTimeParts[1]);

      const myTimer = {
        start: this.timer.start,
        end: formatEndDate(endDateTime),
        user: this.selectedUser,
        debate: this.debate._id
      };

      await timerService.createTimer(myTimer);
      this.modal = false;
      this.$toast.success('Timer created!');
      await this.fetchDebateData();
    },
    async fetchGroup(groupId) {
      try {
        const response = await groupService.getGroup(groupId);
        this.users = [];
        await Promise.all(response.users.map(async (userId) => {
          const user = await userService.getUser(userId);
          this.users.push({ name: user.name, surname: user.surname, id: user._id });
        }));
        this.users.sort((a, b) => {
          return a.surname.localeCompare(b.surname);
        });
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDebateData() {
      try {
        const id = this.$route.params.id;
        this.debate = await debateService.getDebate(id);
        this.parliament = await parliamentService.getParliament(this.debate.parliament);
        await Promise.all(this.parliament.parliamentaryGroups.map(async (groupId) => {
          const group = await this.fetchGroup(groupId);
          this.groups.push({ name: group.name, id: group._id });
        }));
      } catch (error) {
        console.error(error);
      }
    },
    cancelUpdate() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.$toast = useToast();
    this.fetchDebateData();
  }
};

</script>


<template>
  <div class="container">
    <div class="startinfo">
      <div class="editable" v-if="debate">
        <h2>Manage timers in {{debate.title}}</h2>
        <br>
        <BButton @click="modal = !modal"> Create new timer </BButton>
        <BModal v-model="modal" title="New timer" @ok="submitForm">
          <form @submit.prevent="">
            <div class="form-floating mb-3">
              <input type="datetime-local" class="form-control" placeholder="Timer start" v-model="timer.start">
              <label for="floatingInput">Timer start</label>
            </div>
            <div class="form-floating mb-3">
              <input type="time" class="form-control" placeholder="Timer end" v-model="endTime">
              <label for="floatingInput">Timer end</label>
            </div>
            <p>Select the user for the timer:</p>
            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Parliament group selector" v-model="selectedGroup">
                <option v-for="(group, index) in groups" :key="group.id" :value="group.id">
                  {{ group.name }}
                </option>
              </select>
              <label for="floatingSelect">Parliament group</label>
            </div>
            <transition name="fade">
              <div class="form-floating mb-3" v-if="selectedGroup">
                <select class="form-select" id="floatingSelect" aria-label="User selector" v-model="selectedUser">
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.surname }}, {{ user.name }}
                  </option>
                </select>
                <label for="floatingSelect">User</label>
              </div>
            </transition>
          </form>
        </BModal>
        <div class="existents">
        <h4>Timers: </h4>
        <div v-if="debate.timers && debate.timers.length">
          <TimerSquare v-for="timer in debate.timers" :key="timer" :timer="timer" :delete-button="true" class="timer-container"/>
        </div>
      </div>
      </div>
      <div v-else>
        <BButton variant="primary" disabled>
          <BSpinner small type="grow" />
          Loading...
        </BButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.existents{
  margin-top: 2rem;
}
.timer-container {
  margin-bottom: 2rem;
}
</style>