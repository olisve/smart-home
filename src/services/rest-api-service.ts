import {Periphery, PeripheryType} from '@/models/periphery'
import {Device} from '@/models/device'
import {Flow, Link, Node} from '@/models/flow'

const axios = require('axios')

export class RestApiService {

    static host='http://172.25.212.53:8080'

    static debug = false

    static getDevices(): Promise<Device[]> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + '/rest/v1/devices')
        } else {
            return Promise.resolve([
                {id: 123, numberOfPins: 2, serialNumber: 'F2S445', label: 'Main Device', type: 'Cool'}
            ])
        }
    }

    static getPeripheryTypes(): Promise<PeripheryType[]> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + '/rest/v1/periphery/types')
        } else {
            return Promise.resolve([
                {id: 123, name: 'Lamp'},
                {id: 124, name: 'Temperature Sensor'}
            ])
        }
    }

    static getPeriphery(): Promise<Periphery[]> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + '/rest/v1/periphery')
        } else {
            return Promise.resolve([
                {
                    id: 999,
                    name: 'Periphery 1',
                    description: '',
                    type_id: 123,
                    device_id: 123,
                    bank_id: 4323,
                    bit: 3
                }
            ])
        }
    }

    static getPeripheryByDevice(deviceId: number): Promise<Periphery[]> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + `/rest/v1/devices/${deviceId}/periphery`)
        } else {
            return Promise.resolve([
                {
                    id: 999,
                    name: 'Periphery 1',
                    description: '',
                    type_id: 123,
                    device_id: 123,
                    bank_id: 4323,
                    bit: 3
                }
            ])
        }
    }

    static registerPeriphery(deviceId: number, peripheryTypeId: number, name: string, description: string): Promise<Periphery> {
        if (!RestApiService.debug) {
            return axios.post(RestApiService.host + `/rest/v1/devices/${deviceId}/periphery/${peripheryTypeId}`)
        } else {
            return Promise.resolve({
                id: 999,
                name,
                description,
                type_id: peripheryTypeId,
                device_id: deviceId,
                bank_id: 4323,
                bit: 3
            })
        }
    }

    static createFlow(flow: Flow): Promise<Flow> {
        if (!RestApiService.debug) {
            console.log(flow)
            return axios.post(RestApiService.host + '/rest/v1/activities', flow)
        } else {
            return Promise.resolve({ id: 1212, ...flow})
        }
    }

    static updateFlow(flow: Flow): Promise<Flow> {
        if (!RestApiService.debug) {
            return axios.put(RestApiService.host + `/rest/v1/activities/${flow.id}`, flow)
        } else {
            console.log(flow)
            return Promise.resolve(flow)
        }
    }

    static getFlowById(id: string): Promise<Flow> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + `/rest/v1/activities/${id}`)
        } else {
            return Promise.resolve({
                id: 999,
                name: 'Flow',
                description: 'Flow Flow',
                periphery_id: 1234,
                device_id: 123,
                event_type: 'on_rise',
                nodes: [],
                links: []
            })
        }
    }

    static getFlows(): Promise<Flow[]> {
        if (!RestApiService.debug) {
            return axios.get(RestApiService.host + '/rest/v1/activities')
        } else {
            return Promise.resolve([
                {
                    id: 999,
                    name: 'Flow',
                    description: 'Flow Flow',
                    periphery_id: 1234,
                    device_id: 123,
                    event_type: 'on_rise',
                    nodes: [{
                        id: 1552783225875,
                        metadata: {
                            context: null,
                            position: {
                                x: 298,
                                y: 303
                            }
                        },
                        type: "condition"
                    }, {
                        id: 1552783224835,
                        metadata: {
                            context: null,
                            position: {
                                x: 226,
                                y: 121
                            }
                        },
                        type: "device"
                    }],
                    links: [{
                        from: 1552783224835,
                        to: 1552783225875,
                        type: "next"
                    }]
                }
            ])
        }
    }
}