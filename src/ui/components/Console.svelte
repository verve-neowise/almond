<script>

import { consoleStore } from "../store";

consoleStore.subscribe(() => {
});

</script>
<h1 class="title">Console</h1>
<div>
    {#each $consoleStore as line}
        <span> {line} </span>
    {/each}
</div>

<style>
    .title {
        margin: 0;
        padding: 10px 10px;
        background-color: rgb(170, 160, 160);
        font-size: 16px;
        color: #1d1d1d;
    }
    div {
        flex: 1;
        height: 100%;
        padding: 10px;
        background-color: #f0f0f0;
        color: black;
        font-family: monospace;
        overflow: auto;
    }

    span {
        display: block;
        padding: 5px 2px;
        border-bottom: 1px solid #ccc;
    }
</style>