import { Context, Value, Types } from "../../../runtime"
import { ParseError, RuntimeError } from "../../errors"
import { Token } from "../../lexer"
import { Visitor, Expression, Accessible } from "../../node"
import { Position } from "../../position"

export default class VariableExpression extends Accessible implements Expression {

    constructor(
        private name: Token,
        public readonly position: Position = new Position(name, name),
    ) {
        super()
    }

    get start(): Token {
        return this.position.start
    }

    get end(): Token {
        return this.position.end
    }

    public execute(context: Context): Value {
        context.action('VariableExpression', this)
        
        return this.get(context)
    }

    public get(context: Context): Value {
        let value = context.get(this.name.text)
        if (value === undefined) {
            throw new RuntimeError('R-3001', this.position, [this.name.text])
        }
        return value
    }
    
    public set(context: Context, value: Value): void {
        
        if (!context.isExists(this.name.text)) {
            throw new RuntimeError('R-3001', this.position, [this.name.text])
        }
        if (context.isConst(this.name.text)) {
            throw new RuntimeError('R-3001', this.position, [this.name.text])
        }
        let type = context.typeOf(this.name.text)
        if (value.type !== type) {
            throw new Error(`Type of variable ${this.name.text} is ${value.type}, but ${type} is expected`)
        }
        context.set(this.name.text, value)
    }

    visit(visitor: Visitor): void {
        visitor.visit(this)
    }
}