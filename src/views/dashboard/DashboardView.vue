<script>
import groupService from '@/services/groupService.js'
import GroupSquare from "@/components/GroupSquare.vue";
import userService from "@/services/userService.js";

export default {
  name: 'DashboardView',
  data() {
    return {
      groupService: null,
      group: null,
      user: null,
    };
  },
  components: {
    GroupSquare
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
        const user = await userService.getUser(this.$store.state.userid);
        this.user = user;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchGroup() {
      try {
        const group = await groupService.getGroup(this.user.parliamentaryGroup);
        this.group = group;
        if(group==undefined){
          this.group = {name: "No group associated", description: "Associate first a group here to see the content."};
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUser().then(() => {
      this.fetchGroup();
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