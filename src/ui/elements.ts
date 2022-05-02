import { Token, TokenType } from "../parser/lexer"
import { generateWhitespace, getClass } from "./utils";

export function create(token: Token, index: number, selected: { start: number, end: number } = undefined) {

    let stateClasses = selected ? states(index, selected) : ''
    let classes = getClass(token.type)
    let content = ''
    if (token.type === TokenType.WHITESPACE) {
        content = generateWhitespace(token.text);
    }
    else if (token.type === TokenType.STRING) {
        content = `'${token.text}'`
    }
    else {
        content = token.text
    }
    return `<span class="${classes} ${stateClasses}">${content}</span>`
}


function states(index: number, { start, end }) {
    let classes = ''
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
    return classes
}