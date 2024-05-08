<script>
import { useRouter } from 'vue-router';
import userService from "@/services/userService.js";
import groupService from "@/services/groupService.js";
import {useToast} from "vue-toastification";

export default {
  name: 'PersonAddSquare',
  props: {
    userId: String
  },
  data() {
    return {
      user: null,
      deleteProcess: false
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        this.user = await userService.getUser(this.userId);
        const id = this.$route.params.id;
        this.group = await groupService.getGroup(id);
        if(this.group.users.includes(this.user._id)){
          console.log("User already in group", this.user._id);
          this.deleteProcess = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async approveUser() {
      try {
          const updatedUsers = [...this.group.users, this.user._id];
          await groupService.updateGroup(this.group._id, {users: updatedUsers});
          await this.fetchUser();
           this.$toast.success('User added!');
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(){
      try {
          const updatedUsers = this.group.users.filter(user => user !== this.user._id);
          await groupService.updateGroup(this.group._id, {users: updatedUsers});
          await this.fetchUser();
          this.$toast.success('User removed!');
          this.deleteProcess = false;
      } catch (error) {
        console.error(error);
      }
    }
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
        <p class="text-start">{{ user.description }}</p>
        <div v-if="deleteProcess">
          <BButton variant="danger" @click="deleteUser">✕ Remove</BButton>
        </div>
        <div v-else>
        <BButton variant="success" @click="approveUser">✓ Add</BButton>
        </div>
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
</style>