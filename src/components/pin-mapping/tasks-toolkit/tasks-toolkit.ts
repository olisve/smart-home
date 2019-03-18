import { Component, Vue } from 'vue-property-decorator'
import WithRender from './tasks-toolkit.html'
import './tasks-toolkit.less'
import {Task} from "@/models/task"

@WithRender
@Component
export default class TasksToolkit extends Vue {

    tasks: Task[] = [
        { name: 'Device', type: 'device'},
        { name: 'Condition', type: 'condition'},
        { name: 'Assign', type: 'assign'}
    ]

    mounted() {
        const self = this
        const container = document.getElementById('list')
        container.childNodes.forEach((node, index) => {
            node.addEventListener('dragstart', function (event: any) {
                event.dataTransfer.setData('object', JSON.stringify(self.tasks[index]))
            })
        })
    }
}