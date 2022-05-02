import { writable } from "svelte/store";

export let selected = writable({ start: -1, end: -1 });

export let editable = writable<boolean>(false)
export let running = writable({state: false, delay: 0})

export function select(start: number, end: number) {
    selected.set({ start, end });
}

export function switchEditable() {
    editable.update(isEditable => !isEditable)
}

export function run(delay: number) {
    running.set({ state: true, delay })
}

export function stop() {
    running.set({ state: false, delay: 0 })
}