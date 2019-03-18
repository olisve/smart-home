export const assignRectStyle = {
    fill: {
        type: 'linearGradient',
        stops: [
            { offset: '0%', color: '#0FB1BB' },
            { offset: '100%', color: '#00737A' }
        ]
    },
    stroke: 'none'
}

export const deviceRectStyle = {
    fill: {
        type: 'linearGradient',
        stops: [
            { offset: '0%', color: '#5957E7' },
            { offset: '100%', color: '#25287F' }
        ]
    },
    rx: '18',
    stroke: 'none'
}

export const conditionRectStyle = {
    fill: {
        type: 'linearGradient',
        stops: [
            { offset: '0%', color: '#EDB21A' },
            { offset: '100%', color: '#ED6F27' }
        ]
    },
    rx: '45',
    stroke: 'none'
}

export const peripheryCellSize = {
    width: 90,
    height: 90
}

export const peripheryPortStyle = {
    fill: '#E8E8E8',
    stroke: 'gray',
    r: 8
}

export const portStyle = {
    fill: 'green',
    stroke: 'gray',
    r: 8
}