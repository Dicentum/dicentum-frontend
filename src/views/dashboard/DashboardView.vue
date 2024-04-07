<script>
import groupService from '@/services/groupService.js'
import GroupSquare from "@/components/GroupSquare.vue";
import ParliamentSquare from "@/components/ParliamentSquare.vue";
import userService from "@/services/userService.js";
import parliamentService from "@/services/parliamentService.js";

export default {
  name: 'DashboardView',
  data() {
    return {
      groupService: null,
      group: {},
      parliament: {},
      user: null,
    };
  },
  components: {
    GroupSquare,
    ParliamentSquare,
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    email() {
      return this.$store.state.email;
    },
    name() {
      return this.$store.state.name;
    },
  },
  methods: {
    async fetchUser() {
      try {
        const userId = await this.$store.state.userid;
        if (!userId) {
          throw new Error('User ID is not set');
        }
        const user = await userService.getUser(userId);
        this.user = user;
      } catch (error) {
        console.log('Failed to fetch user');
      }
    },
    async fetchGroup() {
      try {
        if(this.user.parliamentaryGroup){
          const group = await groupService.getGroup(this.user.parliamentaryGroup);
          this.group = group;
          this.$store.commit('setGroupId', group._id);
          this.$store.commit('setParliamentId', group.parliament);
        } else {
          this.group = {name: "No group associated", description: "Associate first a group here to see the content."};
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchParliament() {
      try {
        if(this.user.parliamentaryGroup){
          const parliament = await parliamentService.getParliament(this.$store.state.parliamentId);
          this.parliament = parliament;
        } else {
          this.parliament = {name: "No parliament associated", description: "Join first a group to see the parliament content here."};
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUser().then(() => {
      this.fetchGroup().then(() => {
        this.fetchParliament();
      });
    });
  },
};
</script>

<template>
  <div class="container">
    <h1>Welcome back, {{ name }}</h1>
    <div v-if="user">
      {{user.description}}
    </div>
    <p>Dashboard content goes here for {{ username }} - {{ email }}</p>
    <ParliamentSquare :parliament="parliament" />
    <br>
    <GroupSquare :group="group" />
    <br>
    <div v-if="user">
      {{user.name}} {{user.parliamentaryGroup}} {{user.email}} {{user.username}}
    </div>

  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>