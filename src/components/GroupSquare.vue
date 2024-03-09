<script>
export default {
  name: 'GroupSquare',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
};
</script>

<template>
  <div class="group-container" v-if="group && group.name && group.description">
    <div class="group-square">
      <h3 class="text-start">{{ group.name }}</h3>
      <p class="text-start">{{ group.description }}</p>
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
  border-radius: 50px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
}
</style>