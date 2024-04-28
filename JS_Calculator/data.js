const data = new Map();

const specialKeys = [
    {
        name: 'allClear',
        label: 'AC',
        field: 'clear',
        action: 'clear'
    },
    {
        name: 'toggleSign',
        label: '+/-',
        field: 'toggleSign',
        action: 'toggleSign'
    },
    {
        name: 'percentage',
        label: '%',
        field: 'percentage',
        action: 'percentage'
    },
]

const operationKeys = [
    {
        name: 'division',
        label: '/',
        field: 'division',
        action: 'operation'
    },
    {
        name: 'multiplication',
        label: 'x',
        field: 'multiplication',
        action: 'operation'
    },
    {
        name: 'subtraction',
        label: '-',
        field: 'subtraction',
        action: 'operation'
    },
    {
        name: 'addition',
        label: '+',
        filed: 'addition',
        action: 'operation'
    },
    {
        name: 'equals',
        label: '=',
        field: 'equals',
        action: 'equals'
    }
]


data.set('specialKeys', specialKeys)
data.set('operationKeys', operationKeys)

export default data