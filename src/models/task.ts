export interface Task {
    name: string
    type: 'assign' | 'device' | 'condition'
}