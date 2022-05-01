import { writable } from "svelte/store";

export let selected = writable({ start: -1, end: -1 });
export let consoleStore = writable([]);

consoleStore.subscribe(console.log);

export function select(start: number, end: number){
    selected.set({ start, end });
}