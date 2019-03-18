import { Component, Vue } from 'vue-property-decorator'
import WithRender from './system.html'
import './system.less'
import NewPeripheryPopover from "@/components/system/new-periphery-popover/new-periphery-popover"
import {Periphery, PeripheryType} from "@/models/periphery"
import {RestApiService} from "@/services/rest-api-service"
import Label from "@/components/shared/label/label"
import {Device} from "@/models/device"

@WithRender
@Component({
    components: {
        NewPeripheryPopover,
        Label
    }
})
export default class System extends Vue {

    newPeripheryPopoverVisible = false

    periphery: Periphery[] = []
    peripheryTypes: PeripheryType[] = []
    devices: Device[] = []

    created() {
        RestApiService.getDevices()
            .then(devices => {
                this.devices = devices['data']
            })
            .catch(error => console.error(error))

        RestApiService.getPeriphery()
            .then(periphery => {
                this.periphery = periphery['data'][0] //KOSTYL'!
            })
            .catch(error => console.error(error))

        RestApiService.getPeripheryTypes()
            .then(peripheryTypes => {
                this.peripheryTypes = peripheryTypes['data']
            })
            .catch(error => console.error(error))
    }

    openNewPeripheryPopover() {
        this.newPeripheryPopoverVisible = true
    }

    closeNewPeripheryPopover() {
        this.newPeripheryPopoverVisible = false
    }

    registerPeriphery(data: any) {
        RestApiService.registerPeriphery(
            data.deviceId,
            data.peripheryTypeId,
            data.name,
            data.description
        )
            .then(periphery => {
                this.periphery.push(periphery['data'])
                this.closeNewPeripheryPopover()
            })
            .catch(error => console.error(error))
    }

    getPeripheryType(typeId: number): string {
        let typeName = 'N/A'
        this.peripheryTypes.forEach(item => {
            if (item.id === typeId) {
                typeName = item.name
            }
        })
        return typeName
    }
}

