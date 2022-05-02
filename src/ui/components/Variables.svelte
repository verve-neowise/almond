<script lang="ts">
import { variables } from "../store";

</script>

<div class="root">
    {#each $variables as variable}
        <div class="variable">
            <div class="name">
                {#if variable.isConst}
                    <span class="lock">[!]</span>
                {/if} 
                {variable.name}
                :
                <span class="type">{variable.type}</span>
            </div>
            <div class="value">
                    {variable.value}
            </div>
        </div>
    {/each}
</div>

<style>
    .root {
        flex: 1;
        height: 100%;
        background-color: white;
        color: #1d1d1d;
    }
    .variable {
        display: flex;
    }
    .name {
        width: 100%;
        border-right: 1px solid #ccc;
    }
    .type {
        width: 100%;
        color: cornflowerblue;
    }
    .value {
        width: 100%;
    }
    .lock {
        color: red;
    }
</style>