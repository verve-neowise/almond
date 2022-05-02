import { writable } from "svelte/store";

export let selected = writable({ start: -1, end: -1 });
export let consoleStore = writable([]);
export let variables = writable<Variable[]>([])

type Variable = {
    name: string,
    isConst: boolean,
    type: string,
    value: string
}

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

export function select(start: number, end: number){
    selected.set({ start, end });
}