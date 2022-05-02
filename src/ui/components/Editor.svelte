<script lang="ts">
    import { onMount } from "svelte";
    import { Lexer, Source, Token } from "../../parser/lexer";
    import { CodeRunner } from "../code.runner";
    import { generateWhitespace } from "../utils";
    import { addLog, clear, logs } from "../store/console.store";
    import {
        editable,
        running,
        select,
        selected,
        stop,
    } from "../store/editor.store";
    import { addVariable, updateVariable, variables } from "../store/variable.store";
    import { create } from "../elements";

    let tokens: Token[] = [];
    let content: HTMLElement;
    let textContent = "";

    onMount(() => {
        editable.subscribe((editable) => {
            if (editable) {
                textContent = generateWhitespace(content.innerText);
            } else {
                tokens = new Lexer(
                    new Source(content.innerText),
                    true
                ).tokenize();
                render();
            }
        });

        selected.subscribe(render);

        running.subscribe((run) => {
            
            if (run.state) {
                clear()
                variables.set([])
                editable.set(false);
                let codeRunner = new CodeRunner(run.delay);

                codeRunner.onaction = (event) => {
                    if (event.name === "end") {
                        stop();
                    }
                    if (event.name === "print") {
                        addLog(event.values.join(" "));
                    }
                    if (event.name === 'return') {
                        addLog('return: ' + event.values.join(""))
                        codeRunner.stop()
                        stop()
                    }
                    if (event.name === "declare") {
                        addVariable({
                            name: event.values[0],
                            value: event.values[1],
                            type: event.values[2],
                            isConst: event.values[3],
                        });
                    }
                    if (event.name === "set") {
                        updateVariable(event.values[0], event.values[1]);
                    }
                };

                codeRunner.onvisualize = (visualize) => {
                    let start = findIndex(visualize.pos.start);
                    let end = findIndex(visualize.pos.end);
                    select(start, end);
                };
                try {
                    codeRunner.run(content.innerText);
                }
                catch(e) {
                    console.error(e)
                    stop()
                }
            }
        });
    });

    function findIndex(target: Token) {
        return tokens.findIndex(
            (t) => t.row === target.row && t.column === target.column
        );
    }

    function render(selected: any = undefined) {
        textContent = tokens.map((t, i) => create(t, i, selected)).join("");
    }
</script>

<div
    class="editor flex-1 p-2 focus:outline-0 text-md overflow-y-auto"
    contenteditable={$editable}
    bind:this={content}
>
    {@html textContent}
</div>
