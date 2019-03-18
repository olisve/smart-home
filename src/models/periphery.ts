export interface PeripheryType {
    id: number
    name: string
}

export interface Periphery {
    id: number
    name: string
    description: string
    type_id: number
    device_id: number
    bank_id: number
    bit: number
}