<script>
import { useRouter } from 'vue-router';
import userService from "@/services/userService.js";
import fileService from "@/services/fileService.js";
import defaultUser from "@/assets/usericons/default.png";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'MessageSquare',
  props: {
    userId: String,
    content: String,
    date: String
  },
  data() {
    return {
      user: null,
      image: null,
      showImage: false,
      isLoading: false,
      newMessage: '',
      apiURL: API_URL,
      defaultUser: defaultUser,
    };
  },
  created() {
    this.fetchUser();
  },
  computed: {
    dateFormatted() {
      return new Date(this.date).toLocaleString();
    },
    isMe() {
      return this.$store.state.userid === this.userId;
    }
  },
  methods: {
    async fetchUser() {
      this.isLoading = true;
      try {
        this.user = await userService.getUser(this.userId);
        if (this.user.photo) {
          const imageData = await fileService.getImageData(this.user.photo);
          this.image = imageData.filename;
          this.showImage = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>

<template>
  <div class="message-square">
    <div v-if="isLoading" class="loading-message">Loading...</div>
    <div v-else class="message-content">
      <div class="user-section">
        <img v-if="showImage" :src="`${apiURL}/files/${image}`" alt="User Image" class="user-image rounded-circle me-2">
        <img v-if="!showImage" :src="defaultUser" alt="" class="user-image rounded-circle me-2">
        <div class="user-info">
          <p class="user-name">
            <strong>{{ user.surname }}, {{ user.name }}</strong>
            <BBadge variant="success" v-if="isMe" pill>Me</BBadge>
          </p>
          <p class="content-text">{{ content }}</p>
          <p class="date">{{ dateFormatted }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-square {
  margin-bottom: 20px;
}

.loading-message {
  font-size: 1em;
}

.user-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.content {
  margin-top: 5px;
}

.content-text {
  font-size: 1em;
  margin: 0;
}

.date {
  font-size: 0.9em;
  color: #888;
}

.user-image {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
</style>