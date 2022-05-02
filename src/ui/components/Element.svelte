<script lang="ts">
    import { Token, TokenType } from "../../parser/lexer";
import { selected } from "../store/editor.store";
    import { generateWhitespace, getClass } from "../utils";

    export let index: number = 0;
    export let token: Token

    let classes = ''

    selected.subscribe(({ start, end }) => {
        if (index >= start && index <= end) {
            classes = 'selected'
        }
        else {
            classes = ''
        }
        if (index === start) {
            classes += ' start'
        }
        if (index === end) {
            classes += ' end'
        }
    })

</script>
<span class="{classes} {getClass(token.type)}">
    {#if (token.type === TokenType.WHITESPACE)}
        {@html generateWhitespace(token.text)}
    {:else if (token.type === TokenType.STRING)}
        '{@html token.text}'
    {:else}
        {@html token.text} 
    {/if}
</span>
