import { Component, Prop, Vue } from 'vue-property-decorator'
import WithRender from './chart.html'
import { Chart as ChartJs } from 'chart.js'
import './chart.less'

@WithRender
@Component
export default class Chart extends Vue {

    @Prop() chartConfiguration: any
    @Prop() width: number
    @Prop() height: number
    @Prop() title: string
    @Prop() color: string

    colors = {
        green: {'background-color': '#43a047', 'border': '#388e3c'},
        red: {'background-color': '#f44336', 'border': '#e53935'},
        purple: {'background-color': '#ab47bc', 'border': '#7b1fa2'},
        orange: {'background-color': '#fb8c00', 'border': '#ef6c00'}
    }

    mounted () {
        const canvas = document.getElementById('chart-canvas') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const chart = new ChartJs(context, this.chartConfiguration)
    }

}