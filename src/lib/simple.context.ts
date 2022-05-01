import { ReturnError } from "../parser/errors";
import { Token } from "../parser/lexer";
import { ASTNode } from "../parser/node";
import { Context, Executable, FunctionValue, Types, Value } from "../runtime";
import { Variable } from "../runtime/variable";

export type Action = {
    name: string;
    type: 'action' | 'visualize';
    values?: any[]
    pos?: { start: Token; end: Token };
}

export type ActionListener = (action: Action) => void;

export default class SimpleContext implements Context {

    private actionListener: ActionListener | undefined = undefined

    constructor(actionListener?: ActionListener) {
        this.actionListener = actionListener
    }

    action(name: string, node: ASTNode, values: any[] = undefined): void {
        if (this.actionListener) {
            this.actionListener({
                name,
                type: node ? 'visualize' : 'action',
                values: values,
                pos: node ? { start: node.start, end: node.end } : undefined
            })
        }
    }

    public result: Value | undefined;
    private variables = new Map<string, Variable>()

    print(args: any[]) {
        console.log(...args)
    }

    return(value: Value) {
        this.result = value
        this.action('return', undefined, ['return', value.value])
    }

    declare(name: string, value: Value, type: Types, isConst: boolean): void {
        this.variables.set(name, new Variable(value, type, isConst))
    }

    typeOf(name: string): Types {
        return this.variables.get(name)!.type
    }

    isConst(text: string): boolean {
        return this.variables.get(text)!.isConst
    }

    isExists(name: string): boolean {
        return this.variables.has(name)
    }

    set(name: string, value: Value): void {
        this.variables.get(name)!.value = value
    }

    get(name: string): Value {
        return this.variables.get(name)!.value
    }

    function(name: string, executable: Executable): void {
        this.variables.set(name, new Variable(new FunctionValue(executable), Types.Function, true))
    }

    apply(extension: (context: Context) => void): void {
        extension(this)
    }
}