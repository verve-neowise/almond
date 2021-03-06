import { VarDeclarationStatement } from ".";
import { Context, Types, Value } from "../../../runtime";
import { BreakError, ContinueError } from "../../errors";
import { Token, TokenType } from "../../lexer";
import { Expression, Statement, Visitor } from "../../node";
import { Position } from "../../position";
import { VariableExpression } from "../expression";

export default class ForStatement implements Statement {

    constructor(
        private variable: VarDeclarationStatement,
        private to: Expression,
        private step: Expression | undefined,
        private block: Statement,
        public readonly position: Position
    ) {}
    
    
    get start(): Token {
        return this.position.start
    }

    get end(): Token {
        return this.position.end
    }    

    execute(context: Context): void {
        context.visualize('ForStatement', this);
        
        let token = this.variable.variable;
        this.variable.execute(context)

        let variable = new VariableExpression(token, new Position(token, token));

        while (true) {
            let value = variable.get(context).value;
            let end = this.to.execute(context).value;

            if (value > end) {
                break;
            }
            try {
                this.block.execute(context);
            }
            catch(e) {
                if (e instanceof BreakError) {
                    break
                }
                if (e instanceof ContinueError) {
                    continue
                }
            }
            let step = this.step?.execute(context).value ?? 1;
            if (this.step) {
                step = this.step.execute(context).value;
            }
            variable.set(context, new Value(value + step, Types.Number));
        }
    }
    visit(visitor: Visitor): void {
        visitor.visit(this);
    }
}
