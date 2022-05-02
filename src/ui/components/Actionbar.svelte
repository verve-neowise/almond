<script lang="ts">

import { switchEditable, editable, run, running } from "../store/editor.store";

    let delay = 500

    function switchState() {
        switchEditable();
    }

    function runCode() {
        run(delay)
    }
</script>

<div class="bg-white/5 p-2 flex justify-between h-10 items-center">
    <span class="flex items-center gap-2">
        code.cdx 
        <button on:click={switchState}>
            {#if $editable}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            {/if}
        </button>
    </span>
    <div class="flex items-center gap-2">        
        <div>
            <span>delay (ms): </span>
            <input
                class="bg-white/10 focus:outline-0 p-1"
                type="number"
                bind:value={delay}
            />
        </div>
        <button on:click={runCode} disabled={$running.state}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>
</div>
