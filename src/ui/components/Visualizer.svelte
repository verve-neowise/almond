<script lang="ts">
import { Lexer, Source, Token } from "../../parser/lexer";
import { onMount } from "svelte";
import { code } from "./code";
import Element from "./Element.svelte";
import { extensions, SimpleContext } from "../../lib";
import { Action } from "../../lib/simple.context";
import Parser from "../../parser/parser";
import { consoleStore, select } from "../store";

let tokens: Token[] = []

let actions: Action[] = []

let delay = '1000'

let context = new SimpleContext((action) => {
  actions.push(action)
})

context.apply(extensions.stdlib)

function start() {

  const lexer = new Lexer(new Source(code))
  let program = new Parser(lexer.tokenize()).parse()
  console.dir(program);
  
  try {
    program.execute(context)
  }
  catch(e) {
    console.error(e)
  }

  let lifecycle = setInterval(() => {
    let action = actions.shift()
    if (actions.length === 0) {
        clearInterval(lifecycle)
        return
    }
    if (action) {
      if (action.type === "visualize") {
        let start = findIndex(action.pos.start)
        let end = findIndex(action.pos.end)
        select(start, end)
      }
      else {
        consoleStore.update(state => [...state, action.values.join(' ')])
      }
    }
  }, +delay)
}

function findIndex(token: Token) {
  return tokens.findIndex(t => t.row === token.row && t.column === token.column)
}

onMount(() => {
    render(code)
})

function render(code: string) {
  tokens = new Lexer(new Source(code), true).tokenize()
}

</script>

<main>
  <div class="actions">
    <label for="delay">Delay: </label>
    <input id="delay" type="number" bind:value={delay}>

    <button on:click={start}>Start</button>
  </div>
  <div class="canvas"> 
    {#each tokens as token, i}
      <Element token={token} index={i} />
    {/each}
  </div>
</main>

<style>

  main {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .actions {
    width: 100%;
  }
  .canvas {
    flex: 1;
    background-color: rgb(48, 48, 48);
    width: 100%;
    height: 100%;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    line-height: 140%;
    padding: 10px;
    overflow-y: auto;
  }
  
</style>