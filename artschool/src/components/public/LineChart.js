import { Bar,mixins  } from 'vue-chartjs'
const { reactiveProp } = mixins;
 
export default Bar.extend({
	 mixins: [reactiveProp],
	 props: ['options'],
	 mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.chartData, this.options)
	  }
//  mounted () {
//    this.renderChart({
//      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//      datasets: [
//        {
//          label: 'Data One',
//          backgroundColor: '#f87979',
//          data: [2,4,6,8,10,12,14,16,18,20,1,2]
//        }
//      ]
//    }, {responsive: true, maintainAspectRatio: false})
//  }
})