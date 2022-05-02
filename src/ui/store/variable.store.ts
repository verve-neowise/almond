import { writable } from "svelte/store"

type Variable = {
    name: string,
    type: string,
    isConst: boolean,
    value: string
}

export let variables = writable<Variable[]>([
    // { name: 'a', type: 'number', isConst: true, value: '1' },
    // { name: 'b', type: 'number', isConst: false, value: '2' },
    // { name: 'c', type: 'number', isConst: true, value: '3' },
])

export function addVariable(variable: Variable) {
    variables.update(vars => [...vars, variable])
}

export function updateVariable(name: string, value: any) {
    variables.update(vars => {
        const index = vars.findIndex(v => v.name === name)
        if (index === -1) {
            return vars
        }
        vars[index].value = value
        return vars
    })
}