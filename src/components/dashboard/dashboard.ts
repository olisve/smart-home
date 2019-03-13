import { Component, Vue } from 'vue-property-decorator'
import WithRender from './dashboard.html'
import './dashboard.less'
import Chart from './chart/chart'

@WithRender
@Component({
    components: {
        Chart
    }
})
export default class Dashboard extends Vue {

    verticalBarChart = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    pieChart = {
        type: 'pie',
        data: {
            datasets: [
                {
                    data: [
                        20,
                        20,
                        20,
                        20,
                        20,
                    ],
                    backgroundColor: [
                        'red',
                        'orange',
                        'yellow',
                        'green',
                        'blue',
                    ],
                    label: 'Dataset 1'
                }
            ],
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue'
            ]
        },
        options: {
            responsive: true
        }
    }
}