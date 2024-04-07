<script>
import GroupSquare from "@/components/GroupSquare.vue";
import GroupModal from "@/components/GroupModal.vue";
import groupService from "@/services/groupService.js";
import router from "@/router/index.js";
import GroupDeleteModal from "@/components/GroupDeleteModal.vue";

export default {
  name: 'GroupsView',
  data() {
    return {
      user: null,
      groups: [],
      showButton: false,
      showModal: false,
      emptyGroups: [],
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
          this.emptyGroups = [{name: "No groups associated", description: "Join first a group to see the content here"}];
          this.user = this.$store.state.userid;
          this.showButton = true;
        } else {
          const groupPromises = groupIds.map(groupId => groupService.getGroup(groupId));
          this.groups = await Promise.all(groupPromises);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchGroups();
  },
};
</script>

<template>
  <div class="container">
    <h2>Parliamentary Groups:</h2>
    <p>Here you can see the parliamentary groups associated with the current parliament</p>
    <div class="group-container" v-if="emptyGroups.length === 0">
      <GroupSquare v-for="group in groups" :key="group.id" :group="group"/>
    </div>
    <div v-else>
      <GroupSquare v-for="group in emptyGroups" :key="group.id" :group="group" />
      <div class="d-flex justify-content-between">
        <div v-if="user.role !== 'admin'">
        <GroupModal />
        <GroupDeleteModal />
        </div>
      </div>
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
</style>