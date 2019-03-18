import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import WithRender from './new-periphery-popover.html'
import './new-periphery-popover.less'
import {PeripheryType} from "@/models/periphery";
import {Device} from "@/models/device";

@WithRender
@Component
export default class NewPeripheryPopover extends Vue {

    formValue = {
        name: undefined,
        description: undefined,
        peripheryTypeId: 0,
        deviceId: 0
    }

    @Prop() peripheryTypes: PeripheryType[]
    @Prop() devices: Device[]

    peripheryTypesOptions = []
    devicesOptions = []

    @Watch('peripheryTypes', {immediate: true})
    peripheryTypesChange() {
        if (!!this.peripheryTypes) {
            this.peripheryTypesOptions = this.peripheryTypes.map(item => {
                return {value: item.id , text: item.name}
            })
        }
    }

    @Watch('devices', {immediate: true})
    devicesChange() {
        if (!!this.devices) {
            this.devicesOptions = this.devices.map(item => {
                return {value: item.id, text: item.label || 'Device ' + item.id}
            })
        }
    }
}
