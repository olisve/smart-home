import {Component, Vue} from 'vue-property-decorator'
import WithRender from './pin-mapping.html'
import { connectors, dia, linkTools, routers, shapes } from 'jointjs'
import './pin-mapping.less'
import Graph = dia.Graph
import Paper = dia.Paper
import Link = shapes.standard.Link
import Model = shapes.devs.Model
import orthogonal = routers.orthogonal

import metro = routers.metro
import rounded = connectors.rounded
import {
    assignRectStyle, conditionRectStyle, deviceRectStyle,
    peripheryCellSize,
    peripheryPortStyle,
    portStyle
} from "@/components/pin-mapping/utils/styles";
import {RestApiService} from "@/services/rest-api-service"
import {Flow, Node} from "@/models/flow"
import NodePopover from "@/components/pin-mapping/node-popover/node-popover"
import TasksToolkit from "@/components/pin-mapping/tasks-toolkit/tasks-toolkit"

@WithRender
@Component({
    components: {
        TasksToolkit,
        NodePopover
    }
})
export default class PinMapping extends Vue {

    graph: Graph
    paper: Paper

    flow: Flow

    nodePopover = {
        visible: false,
        node: undefined
    }

    cellToNodeMap = new Map()

    mounted () {
        const self = this
        this.graph = new Graph()
        const container = document.getElementById('graph')

        container.addEventListener('drop', function(event: any) {
            event.preventDefault();
            const stringifyTask = event.dataTransfer.getData('object')
            const task = JSON.parse(stringifyTask)
            self.graph.addCell(self.getCellForTask(task.type, event.offsetX, event.offsetY))
        })

        RestApiService.getFlowById(this.$route.params.id)
            .then(flow => {
                this.flow = flow
                if (!this.flow.nodes) {
                    this.flow.nodes = []
                }
                if (!this.flow.links) {
                    this.flow.links = []
                }

                this.graph.on('change:source change:target', function (link) {
                    const sourceCellId = link.get('source').id
                    const targetCellId = link.get('target').id

                    const sourceType = link.get('source').port
                    const targetType = link.get('target').port

                    if(!!sourceCellId && !!targetCellId) {
                        if (sourceType === 'out' && targetType === 'in') {
                            self.flow.links.push({
                                type: 'next',
                                from: self.cellToNodeMap.get(sourceCellId).id,
                                to: self.cellToNodeMap.get(targetCellId).id
                            })
                        }

                        if (sourceType === 'yes' && targetType === 'in') {
                            self.flow.links.push({
                                type: 'right',
                                from: self.cellToNodeMap.get(sourceCellId).id,
                                to: self.cellToNodeMap.get(targetCellId).id
                            })
                        }
                    }
                })

                //TODO: загрузить готовый граф

                flow.nodes.forEach(node => {
                    this.graph.addCell(
                        this.getCellForTask(
                            node.type,
                            node.metadata.position.x,
                            node.metadata.position.y,
                            node
                        )
                    )
                })

                flow.links.forEach(link => {
                    let sourceId
                    this.cellToNodeMap.forEach((value, key) => {
                        if (value.id === link.from) {
                            sourceId = key
                        }
                    })

                    let targetId
                    this.cellToNodeMap.forEach((value, key) => {
                        if (value.id === link.to) {
                            targetId = key
                        }
                    })

                    if (link.type === "next") {
                        const linkModel = new Link({
                            source: {
                                id: sourceId,
                                port: 'out'
                            },
                            target: {
                                id: targetId,
                                port: 'in'
                            }
                        })
                        this.graph.addCell(linkModel)
                    } else {
                        const linkModel = new Link({
                            router: orthogonal,
                            connector: rounded,
                            attrs: {line: {stroke: '#595959'}},
                            source: {
                                id: sourceId,
                                port: 'yes'
                            },
                            target: {
                                id: targetId,
                                port: 'in'
                            }
                        })
                        this.graph.addCell(linkModel)
                    }

                })
            })
            .catch(error => console.error(error))

        this.initPaper(container)
    }

    private initPaper(container: any) {
        const self = this
        this.paper = new Paper({
            el: container,
            model: this.graph,
            width: container.clientWidth,
            height: container.clientHeight,
            gridSize: 15,
            drawGrid: { name: 'mesh', args: { color: 'rgba(0, 0, 0, 0.1)' }},
            defaultLink: new Link({
                router: orthogonal,
                connector: rounded,
                attrs: {line: {stroke: '#595959'}}
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in'
            },
            // Enable marking available cells & magnets
            markAvailable: true,
            linkPinning: false,
            restrictTranslate: true
        })

        this.paper.on('link:mouseenter', function(linkView) {
            linkView.showTools()
        })

        this.paper.on('link:mouseleave', function(linkView) {
            linkView.hideTools()
        })

        this.paper.on('cell:pointerdblclick', function(cellView) {
            self.openNodePopover(
                self.cellToNodeMap.get(cellView.model.id)
            )
        })
    }

    openNodePopover(node: Node) {
        this.nodePopover = {
            visible: true,
            node
        }
    }

    closeNodePopover() {
        this.nodePopover = {
            visible: false,
            node: undefined
        }
    }

    getCellForTask(taskType: string, x: number, y: number, node?: Node) {
        const rectStyle = taskType === 'assign'
            ? assignRectStyle
            : (taskType === 'condition'
                ? conditionRectStyle
                : deviceRectStyle)

        const cell = new Model({
            position: {x: x, y: y},
            size: peripheryCellSize,
            ports: {
                groups: {
                    'in': {
                        position: {
                            name: 'top'
                        },
                        label: {
                            position: {
                                name: 'manual',
                                args: { y: -6, x: -27 }
                            }
                        },
                        attrs: { '.port-body': peripheryPortStyle, text: {text: 'in'} }
                    },
                    'out': {
                        position: {
                            name: 'bottom'
                        },
                        label: {
                            position: {
                                name: 'manual',
                                args: { y: 15, x: -40 }
                            }
                        },
                        attrs: { '.port-body': peripheryPortStyle, text: {text: 'out'} }
                    }
                }
            },
            attrs: {
                '.label': {
                    text: taskType,
                    fill: 'white',
                    'font-size': 14,
                    'font-weight': 'bold',
                    'y-alignment': 24
                },
                rect: rectStyle
            }
        })

        cell.addInPort('in')
        cell.addOutPort('out')

        if (taskType === 'condition') {
            cell.addOutPort('yes')
            cell.portProp('yes', 'attrs/.port-body', portStyle)
            cell.portProp('yes', 'attrs/text', { text: 'yes'})
            cell.portProp('yes', 'label/position', { name: 'manual', args: { y: 15, x: 15 }})
        }

        const self = this
        cell.on('change:position', function(cell) {
            const node = self.cellToNodeMap.get(cell.id)
            node.metadata.position = cell.get('position')
        })

        if (!node) {
            const newNode = {
                id: Date.now(),
                type: taskType,
                metadata: {
                    context: null,
                    position: {
                        x: x,
                        y: y
                    }
                }
            }
            this.flow.nodes.push(newNode)
            this.cellToNodeMap.set(cell.id, newNode)
        } else {
            this.cellToNodeMap.set(cell.id, node)
        }
        return cell
    }

    saveFlow() {
        RestApiService.updateFlow(this.flow)
            .then(flow => {
                alert('Current flow was successfully saved and submitted.')
                console.log(flow)
            })
            .catch(error => console.error(error))
    }
}