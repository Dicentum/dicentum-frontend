<script>
export default {
  name: 'ParliamentSquare',
  props: {
    parliament: {
      type: Object,
      required: true
    }
  },
};
</script>

<template>
  <div class="group-container" v-if="parliament && parliament.name && parliament.description && parliament.location && parliament.totalSeats">
    <div class="group-square">
      <h2 class="text-start">{{ parliament.name }}</h2>
      <h3 class="text-start">{{ parliament.location }}</h3>
      <p class="text-start">{{ parliament.description }}</p>
      <p class="text-start">{{ parliament.totalSeats }}</p>
    </div>
  </div>
</template>

<style scoped>
.group-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-square {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 20%;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}
</style>