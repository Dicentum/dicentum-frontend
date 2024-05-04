<script>
import debateService from "@/services/debatesService.js";

export default {
  name: 'DebateSquare',
  props: {
    debate: {
      type: String,
      required: true
    },
    doNotDisplayIfOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      debateObject: {},
      display: true
    }
  },
  methods: {
    navigateToDebateDetail() {
      this.$router.push(`/debates/${this.debateObject._id}`);
    },
    async fetchDebate() {
      try {
        const debate = await debateService.getDebate(this.debate);
        if (this.doNotDisplayIfOpen && !debate.isClosed) {
          this.display = false;
          return;
        } else {
          this.display = true;
          this.debateObject = debate;
        }

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
  },
  mounted() {
    this.fetchDebate();
  }
};
</script>

<template>
  <div v-if="display">
    <div class="group-container" v-if="debateObject && debateObject.title && debateObject.date" @click="navigateToDebateDetail">
      <div class="group-square">
        <h3 class="text-start">{{ debateObject.title }}</h3>
        <div class="closed-label" v-if="debateObject.isClosed">Closed</div>
        <h5 class="text-start" v-if="debateObject.description">{{ debateObject.description }}</h5>
        <p class="text-start">{{ formatDate(debateObject.date) }}</p>
        <div class="text-start" v-if="debateObject.startDateVote">📭 {{ formatDate(debateObject.startDateVote) }}</div>
        <div class="text-start" v-if="debateObject.endDateVote">📫 {{ formatDate(debateObject.endDateVote) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-container {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.group-square {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative; /* Establish positioning context */
  width: 100%;
  height: 20%;
  background-color: #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}

.closed-label {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: firebrick;
  color: white;
  padding: 5px;
  border-radius: 25px;
  font-size: 0.8em;
}
</style>
