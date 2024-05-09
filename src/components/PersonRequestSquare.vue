<script>
import { useRouter } from 'vue-router';
import userService from "@/services/userService.js";
import groupService from "@/services/groupService.js";
import router from "@/router/index.js";
import {useToast} from "vue-toastification";

export default {
  name: 'PersonRequestSquare',
  props: {
    userId: String
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        this.user = await userService.getUser(this.userId);
      } catch (error) {
        console.error(error);
      }
    },
    async approveUser() {
      try {
        await groupService.acceptRequestGroup(this.$route.params.id, this.userId);
        this.$router.go(-1);
        this.$toast.success('Request of the user accepted!');
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.$toast = useToast();
  }
};
</script>

<template>
  <div class="group-container" v-if="user && user.name && user.surname">
    <div class="group-square">
      <div class="user-info">
        <p class="text-start"><strong>{{user.surname}}</strong>, {{ user.name }}</p>
        <p class="text-start">{{ user.email }}</p>
      </div>
      <div class="other-info">
        <p class="text-start description-also">{{ user.description }}</p>
        <BButton variant="success" @click="approveUser">✓ Accept</BButton>
      </div>
    </div>
  </div>
  <div v-else>
    <BSpinner />
  </div>
</template>

<style scoped>
.group-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.group-square {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 10%;
  background-color: #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}

.user-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.other-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user-info p {
  font-size: 1em;
}

@media only screen and (max-width: 600px) {
  .user-info p {
    font-size: 0.9em;
  }
}
@media only screen and (max-width: 400px) {
  .user-info p {
    font-size: 0.75em;
  }
}
.description-also {
  font-size: 1em;
}
@media only screen and (max-width: 600px) {
  .description-also {
    font-size: 0.9em;
  }
}
@media only screen and (max-width: 400px) {
  .description-also {
    font-size: 0.75em;
  }
}
</style>