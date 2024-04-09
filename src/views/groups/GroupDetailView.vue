<script>
import { useRoute } from 'vue-router';
import groupService from "@/services/groupService.js";
import GroupSquare from "@/components/GroupSquare.vue";
import PersonSquare from "@/components/PersonSquare.vue";
import PersonRequestSquare from "@/components/PersonRequestSquare.vue";

export default {
  name: 'GroupDetailView',
  components: {PersonSquare, GroupSquare, PersonRequestSquare},
  data() {
    return {
      group: null
    };
  },
  created() {
    this.fetchGroupData();
  },
  methods: {
    async fetchGroupData() {
      try {
        const id = this.$route.params.id;
        this.group = await groupService.getGroup(id);
      } catch (error) {
        console.error(error);
      }
    },
    async editGroup() {
      this.$router.push({ name: 'editGroup' });
    },
  }
};
</script>

<template>
  <div v-if="group">
    <div class="editable">
      <h2>{{group.name}}</h2>
      <div style="margin-left: 5rem"><button type="button" class="btn btn-secondary" @click="editGroup">
        Edit
      </button></div>
    </div>
    <h4>{{group.description }}</h4>
    <p class="text-start" v-if="group.seats">
      <span>Seats: <strong>{{group.seats.toString()}}</strong></span>
    </p>
    <div v-if="group.logo">
      <img :src="group.logo" alt="Group logo">
    </div>
    <div v-if="group.color && group.seats">
      <br>
      <div style="display: flex;">
        <div v-for="user in group.users" :key="user.id" :style="{ backgroundColor: group.color, width: '50px', height: '50px', borderRadius: '50%', marginRight:'5px' }"></div>
        <div v-for="n in (group.seats - group.users.length)" :key="n" :style="{ backgroundColor: 'grey', width: '50px', height: '50px', borderRadius: '50%', marginRight:'5px' }"></div>
      </div>
      <br>
    </div>
    <div v-if="group.users && group.users.length">
      <h2>Users:</h2>
      <PersonSquare v-for="user in group.users" :key="user" :userId="user"/>
    </div>
    <div v-if="group.requestedUsers && group.requestedUsers.length">
      <h2>Requested Users:</h2>
      <PersonRequestSquare v-for="user in group.requestedUsers" :key="user" :userId="user"/>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style scoped>
.editable{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>