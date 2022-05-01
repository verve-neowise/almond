import Token from "./lexer/token";

export class Position {
    constructor(
        public readonly start: Token,
        public readonly end: Token
    ) { }
}
