import { Component, Vue } from 'vue-property-decorator'
import WithRender from './flows.html'
import './flows.less'
import {RestApiService} from "@/services/rest-api-service"
import {Flow} from "@/models/flow"
import NewFlowPopover from "@/components/flows/new-flow-popover/new-flow-popover"

@WithRender
@Component({
    components: {
        NewFlowPopover
    }
})
export default class Flows extends Vue {

    configurations = [
        {id: 1, name: 'Lamp flow', description: 'Wonderful flow'},
        {id: 2, name: 'Kitchen sensors flow', description: 'Very-very wonderful flow'},
    ]

    flows: Flow[] = []

    newFlowPopoverVisible = false

    created() {
        RestApiService.getFlows()
            .then(flows => {
                this.flows = flows['data']
                console.log(this.flows)
            })
            .catch(error => console.log(error))
    }

    openNewFlowPopover() {
        this.newFlowPopoverVisible = true
    }

    closeNewFlowPopover() {
        this.newFlowPopoverVisible = false
    }

    createFlow(data: any) {
        RestApiService.createFlow({
            ...data,
            nodes: [],
            links: []
        })
            .then(flow => {
                console.log(flow)
                this.goToConfigurator(flow['data'].id)
            })
            .catch(error => console.error(error))
    }

    goToConfigurator(id: number) {
        this.$router.push({ path: `/configuration/${id}` })
    }
}