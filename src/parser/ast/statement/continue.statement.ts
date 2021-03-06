import { Context } from "../../../runtime";
import { ContinueError } from "../../errors";
import { Token } from "../../lexer";
import { Statement, Visitor } from "../../node";
import { Position } from "../../position";

export default class ContinueStatement implements Statement {

    constructor(
        public token: Token,
        public readonly position: Position
    ) { }

    get start(): Token {
        return this.position.start
    }

    get end(): Token {
        return this.position.end
    }

    execute(context: Context): void {
        context.visualize('ContinueStatement', this)
        
        throw new ContinueError(`Break statement at ${this.token.row}:${this.token.column}`)
    }

    visit(visitor: Visitor): void {
        visitor.visit(this)
    }
}