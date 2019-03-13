import { Component, Prop, Vue } from 'vue-property-decorator'
import WithRender from './label.html'
import './label.less'

@WithRender
@Component
export default class Label extends Vue {

    @Prop() name: string
    @Prop() value: string
}