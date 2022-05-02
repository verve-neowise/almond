<script lang="ts">
import Navbar from "./components/Navbar.svelte";
import Variables from "./components/Variables.svelte";
import Visualizer from "./components/Visualizer.svelte";
import Console from './components/Console.svelte'

</script>
<main class="h-full flex flex-col">
    <Navbar/>
    <div class="grid grid-cols-5 h-full flex-1">
            <Visualizer/>
            <div class="flex flex-col col-span-2 ">
                <Variables/>
                <Console/>
            </div>
    </div>
</main>
