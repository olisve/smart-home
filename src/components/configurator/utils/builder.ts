import { shapes } from 'jointjs'
import Model = shapes.devs.Model

const deviceModel = new Model({
    position: {x: 50, y: 50},
    size: {width: 180, height: 90},
    inPorts: ['in1','in2'],
    outPorts: ['out'],
    ports: {
        groups: {
            'in': {
                attrs: {
                    '.port-body': {
                        fill: '#16A085'
                    }
                }
            },
            'out': {
                attrs: {
                    '.port-body': {
                        fill: '#E74C3C'
                    }
                }
            }
        }
    },
    attrs: {
        '.label': {text: 'Model', 'ref-x': .5, 'ref-y': .2},
        rect: {fill: '#c8e6c9'}
    }
})

export function getCellForDevice (device: any, x: number, y: number) {
    const newCell = deviceModel.clone()
    newCell.set('position', {x: x, y: y})
    newCell.attr('.label/text', device.name)
    return newCell
}