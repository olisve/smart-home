import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import WithRender from './node-popover.html'
import './node-popover.less'
import {AssignContext, ConditionContext, DeviceContext, Node} from "@/models/flow"
import {RestApiService} from "@/services/rest-api-service"

@WithRender
@Component
export default class NodePopover extends Vue {

    @Prop() node: Node
    @Prop() deviceId: number

    @Watch('node', {immediate: true})
    nodeChange() {
        if (!!this.node) {
            if (!this.node.metadata.context) {
                if (this.node.type === 'assign') {
                    this.node.metadata.context = this.assignContext
                } else if (this.node.type === 'condition') {
                    this.node.metadata.context = this.conditionContext
                } else {
                    this.node.metadata.context = this.deviceContext
                }
            } else {
                this.chosenPeriphery = {
                    device_id: (<DeviceContext>this.node.metadata.context).device_id,
                    bank_id: (<DeviceContext>this.node.metadata.context).bank_id,
                    bit: (<DeviceContext>this.node.metadata.context).bit
                }
                this.saveContext = {...this.node.metadata.context}
            }
        }
    }

    created() {
        if (this.node.type === 'device') {
            RestApiService.getPeripheryByDevice(this.deviceId)
                .then(periphery => {
                    this.peripheryOptions = periphery.map(item => {
                        return {
                            value: {
                                device_id: item.device_id,
                                bank_id: item.bank_id,
                                bit: item.bit
                            },
                            text: item.name || 'Periphery device ' + item.id
                        }
                    })
                })
        }
    }

    saveContext: any

    operationsOptions = [
        { value: 'eq', text: 'Equals' },
        { value: 'ne', text: 'Not Equals' },
        { value: 'gt', text: 'Greater then' },
        { value: 'lt', text: 'Less then' }
    ]

    actionsOptions = [
        { value: 'get', text: 'Get' },
        { value: 'set', text: 'Set' }
    ]

    peripheryOptions = []

    chosenPeriphery = {
        device_id: undefined,
        bank_id: undefined,
        bit: undefined
    }

    assignContext: AssignContext = {
        key: undefined,
        value: undefined
    }

    conditionContext: ConditionContext = {
        v1: undefined,
        operation: undefined,
        v2: undefined
    }

    deviceContext: DeviceContext = {
        action: undefined,
        device_id: undefined,
        bank_id: undefined,
        bit: undefined,
        context_name: undefined
    }

    save() {
        if (this.node.type === 'device') {
            this.node.metadata.context = {
                action: (<DeviceContext>this.node.metadata.context).action,
                device_id: this.chosenPeriphery.device_id,
                bank_id: this.chosenPeriphery.bank_id,
                bit: this.chosenPeriphery.bit,
                context_name: (<DeviceContext>this.node.metadata.context).context_name
            }
        }
        this.$emit('save')
    }

    cancel() {
        if (!!this.saveContext) {
            this.node.metadata.context = this.saveContext
        } else {
            this.node.metadata.context = null
        }
        this.$emit('cancel')
    }
}