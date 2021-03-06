import { Context, Value, Types } from "../../../runtime"
import { Token } from "../../lexer"
import { Visitor, Expression } from "../../node"
import { Position } from "../../position"


export default class TernaryExpression implements Expression {

    constructor(
        public result: Expression,
        public trueExpr: Expression,
        public falseExpr: Expression,
        public readonly position: Position
    ) {}

    get start(): Token {
        return this.result.start
    }

    get end(): Token {
        return this.falseExpr.end
    }

    execute(context: Context): Value {
        context.visualize('TernaryExpression', this)
        
        let result = this.result.execute(context)
        if (result.type === Types.Boolean) {
            if (result.value) {
                return this.trueExpr.execute(context)
            } else {
                return this.falseExpr.execute(context)
            }
        }
        throw new Error(`Cannot apply ternary to ${result.type}`)
    }

    visit(visitor: Visitor): void {
        visitor.visit(this)
    }
}