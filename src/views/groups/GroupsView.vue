<script>
import GroupSquare from "@/components/GroupSquare.vue";
import GroupModal from "@/components/GroupModal.vue";
import groupService from "@/services/groupService.js";
import router from "@/router/index.js";
import GroupDeleteModal from "@/components/GroupDeleteModal.vue";
import userService from "@/services/userService.js";

export default {
  name: 'GroupsView',
  data() {
    return {
      user:  this.$store.state.userid,
      userRole: this.$store.state.userRole,
      groups: [],
      showButton: false,
      showModal: false,
      emptyGroups: [],
      condition: false,
    };
  },
  components: {
    GroupDeleteModal,
    GroupSquare,
    GroupModal,
  },
  methods: {
    router() {
      return router
    },
    async fetchGroups() {
      try {
        const groupIds = await groupService.getGroupsRelated(this.$store.state.parliamentId);
        if(groupIds===undefined){
          if(this.userRole !== 'admin'){
          this.emptyGroups = [{name: "No groups associated", description: "Join first a group to see the content here"}];
          this.showButton = true;
          } else {
            this.emptyGroups = [{name: "No groups associated", description: "Create a parliament to start working with it."}];
            this.showButton = false;
          }
        } else {
          const groupPromises = groupIds.map(groupId => groupService.getGroup(groupId));
          this.groups = await Promise.all(groupPromises);
        }
      } catch (error) {
        console.error(error);
      }
    },
    createGroup() {
      this.$router.push({ name: 'createGroup' });
    },
    async isAdminAndParliamentCreated() {
      try {
        const userId = await this.$store.state.userid;
        if (!userId) {
          throw new Error('User ID is not set');
        }
        const user = await userService.getUser(userId);
        const parliament = this.$store.state.parliamentId;
        if (user.role === "admin" && parliament) {
          this.condition = true;
        }
      } catch (error) {
        console.log('Failed to fetch user');
      }
    },
  },
  mounted() {
    this.fetchGroups().then(() => {
      this.isAdminAndParliamentCreated();
    });
  },
};
</script>

<template>
  <div class="container">
    <div class="editable">
      <h2>Parliamentary Groups:</h2>
      <button type="button" class="btn btn-primary" @click="createGroup" v-if="condition">
        Create new group
      </button>
    </div>
    <p class="introduction">Here you can see the parliamentary groups associated with the current parliament</p>
    <div class="group-container" v-if="emptyGroups.length === 0">
      <GroupSquare v-for="group in groups" :key="group.id" :group="group"/>
    </div>
    <div v-else>
      <GroupSquare v-for="group in emptyGroups" :key="group.id" :group="group" />
    </div>
    <div v-if="showButton" class="d-flex justify-content-between">
      <GroupModal />
      <GroupDeleteModal />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.group-container {
  margin-bottom: 2rem;
}
.editable {
  display: flex;
  justify-content: space-between; /* Ensures elements are pushed to the far sides */
  align-items: center;
  width: 100%; /* Make sure the container spans the full width */
}
.introduction{
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
