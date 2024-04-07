<script>

export default {
  name: 'GroupSquare',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToGroupDetail() {
      this.$router.push(`/groups/${this.group._id}`);
    }
  }
};
</script>

<template>
  <div class="group-container" v-if="group && group.name && group.description" @click="navigateToGroupDetail">
    <div class="group-square">
      <h3 class="text-start">{{ group.name }}</h3>
      <p class="text-start">{{ group.description }}</p>
      <p class="text-start" v-if="group.seats">
        <span>{{ group.seats.toString() + " " }}</span>
        <span v-for="seat in group.seats" :key="seat">👤</span>
      </p>
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
  cursor: pointer;
}

.group-square {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 20%;
  background-color: #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}
</style>