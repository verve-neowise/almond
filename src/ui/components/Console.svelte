<script>
import { logs } from "../store/console.store";

</script>
<div class=" flex-1 ">
    <h1 class="p-2 bg-white/5 h-10 flex items-center font-bold text-md">Console</h1>
    <div class="console overflow-y-auto flex flex-col p-2 gap-1">
        {#each $logs as log}
        <span>{log}</span>
        {/each}
    </div>
</div>