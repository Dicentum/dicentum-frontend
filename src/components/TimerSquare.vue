<script>
import { ref } from "vue";
import timerService from "@/services/timerService.js";
import userService from "@/services/userService.js";
import {useToast} from "vue-toastification";

export default {
  name: 'TimerSquare',
  props: {
    timer: {
      type: String,
      required: true
    },
    doNotDisplayIfPassed: {
      type: Boolean,
      required: false,
      default: false
    },
    deleteButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      timerObject: {},
      display: true,
      user: {},
      intervalId: null,
      timeDifference: {
        minutes: 0,
        seconds: 0,
        message: ''
      }
    }
  },
  computed: {
    startDateTime() {
      return new Date(this.timerObject.start);
    },
    endDateTime() {
      return new Date(this.timerObject.end);
    }
  },
  methods: {
    async deleteTimer() {
      try {
        await timerService.deleteTimer(this.timerObject._id);
        this.display = false;
        this.$toast.success('Timer deleted!');
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTimer() {
      try {
        const timer = await timerService.getTimer(this.timer);
        if (this.doNotDisplayIfPassed && timer.end < new Date()) {
          this.display = false;
          return;
        } else {
          this.display = true;
          this.timerObject = timer;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUser() {
      try {
        const user = await userService.getUser(this.timerObject.user);
        this.user = user;
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
    startTimerInterval() {
      this.intervalId = setInterval(() => {
        this.updateTimeDifference();
      }, 1000);
    },
    stopTimerInterval() {
      clearInterval(this.intervalId);
    },
    updateTimeDifference() {
      const now = new Date();
      if (now >= this.startDateTime && now <= this.endDateTime) {
        const diffInMilliseconds = this.endDateTime - now;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        this.timeDifference.minutes = Math.floor(diffInSeconds / 60);
        this.timeDifference.seconds = diffInSeconds % 60;
        this.timeDifference.message = 'Running';
      } else if (now < this.startDateTime) {
        const diffInMilliseconds = this.endDateTime - this.startDateTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        this.timeDifference.minutes = Math.floor(diffInSeconds / 60);
        this.timeDifference.seconds = diffInSeconds % 60;
        this.timeDifference.message = 'Ready';
      } else {
        this.timeDifference.minutes = 0;
        this.timeDifference.seconds = 0;
        this.timeDifference.message = 'Ended';
        this.stopTimerInterval();
      }
    }
  },
  mounted() {
    this.$toast = useToast();
    this.fetchTimer().then(() => {
      this.fetchUser();
      this.startTimerInterval();
      this.updateTimeDifference(); // Initially calculate the time difference
    });
  },
  beforeUnmount() {
    this.stopTimerInterval();
  }
};
</script>

<template>
  <div v-if="display">
    <div class="group-container" v-if="timerObject">
      <div class="group-square">
        <h5 class="text-start"><strong>{{ user.surname }}</strong>, {{user.name}}</h5>
        <div class="timer-label" :class="{
    'timer-label-running': timeDifference.message === 'Running',
    'timer-label-debate': timeDifference.message === 'Ready',
    'timer-label-ended': timeDifference.message === 'Ended'}">
          {{ timeDifference.message }}
        </div>
        <p class="text-start" v-if="timerObject.start">{{ formatDate(timerObject.start) }}</p>
        <h4><strong>{{ timeDifference.minutes }}</strong>:{{ timeDifference.seconds.toString().padStart(2, '0') }} </h4>
        <div class="delete-button">
          <BButton v-if="deleteButton" @click="deleteTimer" variant="danger">Delete</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-square {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  width: 100%;
  height: 20%;
  background-color: #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}

.timer-label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  padding: 5px;
  border-radius: 25px;
  font-size: 0.8em;
}
.timer-label-running {
  background-color: orange;
}
.timer-label-debate {
  background-color: green;
}
.timer-label-ended {
  background-color: red;
}
.delete-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
