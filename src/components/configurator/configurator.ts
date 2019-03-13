import { Component, Vue } from 'vue-property-decorator'
import WithRender from './configurator.html'
import { connectors, dia, layout, linkTools, routers, shapes } from 'jointjs'
import './configurator.less'
import Graph = dia.Graph
import Paper = dia.Paper
import Rectangle = shapes.standard.Rectangle
import Link = shapes.standard.Link
import Model = shapes.devs.Model
import orthogonal = routers.orthogonal
import metro = routers.metro
import rounded = connectors.rounded
import { getCellForDevice } from '@/components/configurator/utils/builder'
import DirectedGraph = layout.DirectedGraph
import ToolsView = dia.ToolsView
import Vertices = linkTools.Vertices
import Segments = linkTools.Segments
import TargetArrowhead = linkTools.TargetArrowhead
import SourceArrowhead = linkTools.SourceArrowhead
import SourceAnchor = linkTools.SourceAnchor
import TargetAnchor = linkTools.TargetAnchor
import Boundary = linkTools.Boundary
import Remove = linkTools.Remove
import Button = linkTools.Button
import SetupPopup from '@/components/configurator/setup-popup/setup-popup'

var verticesTool = new Vertices();
var segmentsTool = new Segments();
var sourceArrowheadTool = new SourceArrowhead();
var targetArrowheadTool = new TargetArrowhead();
var sourceAnchorTool = new SourceAnchor();
var targetAnchorTool = new TargetAnchor();
var boundaryTool = new Boundary();
var removeButton = new Remove();

@WithRender
@Component({
    components: {
        SetupPopup
    }
})
export default class Configurator extends Vue {

    graph: Graph
    setupPopoverVisible = false

    items = [
        {id: '1', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '2', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '3', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '4', name: 'Device 4', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '5', name: 'Device 1', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '6', name: 'Device 2', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '7', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '8', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '9', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'},
        {id: '10', name: 'Device 3', status: 'Active', ip: '127.0.0.1', port: '???', lastPing: '3/18/2017'}
    ]

    mounted () {
        this.graph = new Graph()
        const container = document.getElementById('graph')

        const paper = new Paper({
            el: container,
            model: this.graph,
            width: container.clientWidth,
            height: container.clientHeight,
            background: {
                color: 'rgba(0, 0, 0, 0.01)'
            },
            gridSize: 10,
            drawGrid: true,
            defaultLink: new Link({
                router: metro,
                connector: rounded
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
            linkPinning: false
        })

        this.items.forEach(item => {
            this.graph.addCell(getCellForDevice(item, Math.random()*100, Math.random()*100))
        })

        var self = this
        this.graph.on('change:source change:target', function (link) {
            console.log(link)
            const sourcePort = link.get('source').port
            const sourceId = link.get('source').id
            const targetPort = link.get('target').port
            const targetId = link.get('target').id

            const removeButton = new Button({
                markup: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 12,
                        'fill': '#E53935',
                        'stroke': '#E40500',
                        'cursor': 'pointer'
                    }
                }],
                distance: 30,
                offset: 0,
                action: function(evt: any) {
                    self.setupPopoverVisible = false
                    alert('I WORK');
                    console.log(evt)
                }
            })

            const setupButton = new Button({
                markup: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 12,
                        'fill': 'black',
                        'cursor': 'pointer'
                    }
                }],
                distance: 60,
                offset: 0,
                action: function(evt: any) {
                }
            })

            var toolsView = new ToolsView({
                tools: [
                    removeButton,
                    setupButton
                ]
            });

            var linkView = link.findView(paper);
            linkView.addTools(toolsView);
        })

        paper.on('link:mouseenter', function(linkView) {
            linkView.showTools();
        });

        paper.on('link:mouseleave', function(linkView) {
            linkView.hideTools();
        });

        function out (m: any) {
            console.log(m)
        }
    }

    layout() {
        DirectedGraph.layout(this.graph, {
            nodeSep: 50,
            edgeSep: 80,
            rankDir: "TB"
        })
    }

    private openSetupPopover() {
        this.setupPopoverVisible = true
    }
    private createSetupButton () {
        return Button.extend({
            name: 'setup-button',
            options: {
                markup: [{
                    tagName: 'circle',
                    selector: 'button',
                    attributes: {
                        'r': 7,
                        'fill': '#001DFF',
                        'cursor': 'pointer'
                    }
                }, {
                    tagName: 'path',
                    selector: 'icon',
                    attributes: {
                        'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
                        'fill': 'none',
                        'stroke': '#FFFFFF',
                        'stroke-width': 2,
                        'pointer-events': 'none'
                    }
                }],
                distance: 60,
                offset: 0,
                action: function(evt: any) {
                    alert('I WORK' + evt);
                }
            }
        });
    }

}