<script>
import groupService from '@/services/groupService'; // Asegúrate de importar tu servicio

export default {
  data() {
    return {
      username: this.$store.state.username,
      groupName: '',
      groupService: null
    };
  },
  created(){
    this.groupService = new groupService();
  },
  methods: {
    getGroups(){
      this.groupService.getGroups().then(data => {
        this.groupName = data;
      })
    }
  },
  mounted() {
    this.getGroups();
    
  }
};
</script>

<template>
  <h1>Dashboard</h1>
  <p>Dashboard content goes here for {{ username }}</p>

 <div v-for="group in groupName">{{  group.name }}</div>
</template>

<style scoped>

</style>