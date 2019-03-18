export interface Flow {
    id?: number
    name: string
    description: string
    periphery_id: number,
    device_id: number
    event_type: string //'on_rise' | 'on_down'
    nodes: Node[]
    links: Link[]
}

export interface Node {
    id: number
    type: string //'assign' | 'device' | 'condition'
    metadata: {
        context: AssignContext | DeviceContext | ConditionContext
        position: {
            x: number
            y: number
        }
    }
}

export interface Link {
    type: string //'next' | 'right'
    from: number
    to: number
}

export interface AssignContext {
    key: string
    value: string
}

export interface DeviceContext {
    action: string //'get' | 'set'
    device_id: number
    bank_id: number
    bit: number
    context_name: string
}

export interface ConditionContext {
    v1: string
    v2: string
    operation: string //'eq' | 'ne' | 'gt' | 'lt'
}