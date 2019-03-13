import { Component, Vue } from 'vue-property-decorator'
import WithRender from './system-information.html'
import './system-information.less'
import Label from '@/components/shared/label/label'

@WithRender
@Component({
    components: {
        Label
    }
})
export default class SystemInformation extends Vue {

    items = [
        { id: '1', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '2', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '3', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '4', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '5', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '6', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '7', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '8', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '9', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '10', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '11', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '12', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '13', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '14', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '15', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '16', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '17', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '18', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '19', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
        { id: '20', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017' },
    ]
}