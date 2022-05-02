<script lang="ts">
import Console from "./components/Console.svelte";
import Variables from "./components/Variables.svelte";
import Visualizer from "./components/Visualizer.svelte";
</script>
<main>
    <Visualizer/>
    <div class="info">
        <Variables/>
        <Console/>
    </div>
</main>

<style>
    main {
        display: flex;
        gap: 20px;
        height: 80vh;
        width: 80vw;
        padding: 20px;
    }

    .info {
        display: flex;
        flex-direction: column;   
        width: 100%;
        height: 100%;  
        flex: 1;   
    }
    .info  * {
        flex: 1;
        height: 100%;
        width: 100%;
    }
</style>