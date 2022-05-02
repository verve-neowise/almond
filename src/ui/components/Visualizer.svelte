<script lang="ts">
import { Lexer, Source, Token } from "../../parser/lexer";
import { onMount } from "svelte";
import { code } from "./code";
import Element from "./Element.svelte";
import { extensions, SimpleContext } from "../../lib";
import { Action, Event, Visualize } from "../../lib/simple.context";
import Parser from "../../parser/parser";
import { addVariable, consoleStore, select, updateVariable } from "../store";

let tokens: Token[] = []

let events: (Event & (Action | Visualize))[] = []

let delay = '1000'

let context = new SimpleContext((event) => {
  events.push(event)
})

context.apply(extensions.stdlib)

function start() {

  const lexer = new Lexer(new Source(code))
  let program = new Parser(lexer.tokenize()).parse()
  
  try {
    program.execute(context)
  }
  catch(e) {
    console.error(e)
  }

  let lifecycle = setInterval(() => {
    let event = events.shift()
    if (events.length === 0) {
        clearInterval(lifecycle)
        return
    }
    if (event) {
      if (event.type === "visualize") {
        let start = findIndex(event.pos.start)
        let end = findIndex(event.pos.end)
        select(start, end)
      }
      else if (event.type === "action") {
        console.log(event.name);
        if (event.name === 'print') {
          let result = event.values.join(' ')
          consoleStore.update(state => [...state, result])
        }
        if (event.name === 'declare') {
          addVariable({ 
            name: event.values[0],
            value: event.values[1],
            type: event.values[2],
            isConst: event.values[3],
           })
        }
        if (event.name === 'set') {
          updateVariable(event.values[0], event.values[1])
        }
      }
    }
  }, +delay)
}

function findIndex(token: Token) {
  return tokens.findIndex(t => t.row === token.row && t.column === token.column)
}

let canvas: HTMLElement

onMount(() => {
    canvas.oninput = () => {
      console.log('render');
      render(canvas.innerText);
    }
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
  <div class="canvas" bind:this={canvas}> 
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