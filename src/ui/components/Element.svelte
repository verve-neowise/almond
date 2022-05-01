<script lang="ts">
    import { Token, TokenType } from "../../parser/lexer";
    import { selected } from "../store";
    import { generateWhitespace, getClass } from "./utils";

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

<style>
    .start {
        border-radius: 5px 0px 0px 5px;
    }
    .end {
        border-radius: 0px 5px 5px 0px;
    }
    .selected {
        background-color: #f8fa6f41;
    }

    span {
        color: white;
    }

    .keyword {
        color: #a27df8;
    }

    .string {
        color: #7df8a2;
    }
    
    .number {
        color: #f6f87d;
    }

    .operator {
        color: aqua;
    }
</style>