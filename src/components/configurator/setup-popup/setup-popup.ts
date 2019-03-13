import { Component, Vue } from 'vue-property-decorator'
import WithRender from './setup-popup.html'
import './setup-popup.less'

@WithRender
@Component
export default class SetupPopup extends Vue {

}