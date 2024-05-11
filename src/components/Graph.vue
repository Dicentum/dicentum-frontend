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
    },
    totalSeats: {
      type: Number,
    }
  },
  mounted() {
    let svg;
    if(this.totalSeats < 10){
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(1)
                  .seatRadius(20)
          )
    } else {
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
          )
    }
    svg.append('path');
  },
};
</script>