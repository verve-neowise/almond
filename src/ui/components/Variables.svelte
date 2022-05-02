<script lang="ts">
import { isContext } from 'vm';
 
import { variables } from '../store/variable.store'
</script>

<div class=" flex-1 border-b-2 border-black/10">
    <h1 class="bg-white/5 p-2 flex items-center font-bold  h-10 border-b border-black/10">Variables</h1>
    <div class="flex flex-col gap-3 p-3">
        {#each $variables as variable} 
            <div class="flex items-center gap-3 text-md">
                <div class="{ variable.isConst ? 'text-blue-500' : 'text-red-500' } font-bold">
                    {variable.isConst ? 'C' : 'V'}
                </div>
                {variable.name} : { variable.type } = {variable.value}
            </div>
        {/each}
    </div>
</div>