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
    if(this.totalSeats < 13){
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(1)
                  .seatRadius(30)
          )
    } else if (this.totalSeats < 26) {
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(2)
                  .seatRadius(30)
                  .rowHeight(100)
          )
    } else if (this.totalSeats < 100) {
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(3)
                  .seatRadius(20)
                  .rowHeight(150)
          )
    } else if (this.totalSeats < 200){
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(5)
                  .seatRadius(11)
                  .sectionGap(40)
                  .rowHeight(28)
          )
    } else {
      svg = d3.select('svg#chart')
          .append('g')
          .call(
              pc.parliamentChart()
                  .width(800)
                  .aggregatedData(this.data)
                  .sections(5)
                  .seatRadius(8)
                  .sectionGap(40)
                  .rowHeight(22)
          )
    }
    svg.append('path');
  },
};
</script>