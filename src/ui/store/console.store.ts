import { writable } from "svelte/store";

export let logs = writable<string[]>([])

export function addLog(log: string) {
    logs.update(l => [...l, log])
}

export function clear() {
    logs.set([])
}