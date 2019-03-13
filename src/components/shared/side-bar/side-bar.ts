import { Component, Vue } from 'vue-property-decorator'
import WithRender from './side-bar.html'
import './side-bar.less'

@WithRender
@Component
export default class SideBar extends Vue {

}