<template>
  <svg id="chart" width="100%" viewBox="0 0 800 400"></svg>
</template>

<script>
import * as d3 from 'd3';
import * as pc from "d3-parliament-chart";

export default {
  name: 'graph',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const svg = d3.select('svg#chart')
        .append('g')
        .call(
            pc.parliamentChart()
                .width(800)
                .aggregatedData(this.data)
        )
    svg.append('path');
  },
};
</script>

<style>
</style>