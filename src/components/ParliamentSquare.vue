<script>
export default {
  name: 'ParliamentSquare',
  props: {
    parliament: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToParliamentDetail() {
      this.$router.push(`/parliament`);
    }
  }
};
</script>

<template>
  <div class="group-container" v-if="parliament && parliament.name && parliament.description" @click="navigateToParliamentDetail">
    <div class="group-square">
      <h3 class="text-start">{{ parliament.name }}</h3>
      <h5 class="text-start" v-if="parliament.location">📍 {{ parliament.location }}</h5>
      <p class="text-start">{{ parliament.description }}</p>
      <p class="text-start" v-if="parliament.totalSeats">🪑 {{ parliament.totalSeats }}</p>
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
  cursor: pointer
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