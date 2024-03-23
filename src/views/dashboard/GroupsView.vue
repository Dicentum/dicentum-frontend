<script>
import GroupSquare from "@/components/GroupSquare.vue";
import groupService from "@/services/groupService.js";

export default {
  name: 'GroupsView',
  data() {
    return {
      groups: [], // Initialize groups as an empty array
    };
  },
  components: {
    GroupSquare
  },
  methods: {
    async fetchGroups() {
      try {
        const groupIds = await groupService.getGroupsRelated(this.$store.state.parliamentId);
        if(groupIds===undefined){
          this.groups = [{name: "No groups associated", description: "Associate first a group here to see the content."}];
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
    <p>Here you can see the parliamentary groups associated with the current parliament.</p>
    <div class="group-container">
      <GroupSquare v-for="group in groups" :key="group.id" :group="group" />
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