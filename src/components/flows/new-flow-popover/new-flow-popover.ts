import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import WithRender from './new-flow-popover.html'
import './new-flow-popover.less'
import {RestApiService} from "@/services/rest-api-service"

@WithRender
@Component
export default class NewFlowPopover extends Vue {

    formValue = {
        name: 'New flow',
        description: '',
        periphery_id: undefined,
        device_id: undefined,
        event_type: undefined
    }

    eventsOptions = [
        { value: 'on_rise', text: 'On rise' },
        { value: 'on_down', text: 'On down' }
    ]
    peripheryOptions = []

    chosenPeriphery = {
        periphery_id: undefined,
        device_id: undefined
    }

    created() {
        RestApiService.getPeriphery()
            .then(periphery => {
                this.peripheryOptions = periphery['data'][0].map(item => {
                    return {value: { periphery_id: item.id, device_id: item.device_id}, text: item.name || 'Periphery device ' + item.id}
                })
            })
            .catch(error => console.log(error))
    }

    create(event: any) {
        this.formValue.periphery_id = this.chosenPeriphery.periphery_id
        this.formValue.device_id = this.chosenPeriphery.device_id
        this.$emit('create', this.formValue)
    }
}
