import { Token } from "../parser/lexer";
import { ASTNode } from "../parser/node";
import { Context, Executable, FunctionValue, Types, Value } from "../runtime";
import { Variable } from "../runtime/variable";

export type Event = {
    name: string;
    type: 'action' | 'visualize';
}

export type Action = {
    type: 'action';
    values: any[]
} & Event; 

export type Visualize = {
    type: 'visualize';
    pos: { start: Token; end: Token };
} & Event;

export type EventListener = (event: Event & (Action | Visualize)) => void;

export default class SimpleContext implements Context {

    private eventListener: EventListener | undefined = undefined

    constructor(actionListener?: EventListener) {
        this.eventListener = actionListener
    }

    visualize(name: string, node: ASTNode): void {
        if (this.eventListener) {
            this.eventListener({
                name,
                type: 'visualize',
                pos: { start: node.start, end: node.end }
            })
        }
    }

    action(name: string, args: any[]): void {
        if (this.eventListener) {
            this.eventListener({
                name,
                type: 'action',
                values: args
            })
        }
    }

    public result: Value | undefined;
    private variables = new Map<string, Variable>()

    print(args: any[]) {
        console.log(...args)
        this.action('print', [...args])
    }

    return(value: Value) {
        this.result = value
        this.action('return', ['return', value.value])
    }

    declare(name: string, value: Value, type: Types, isConst: boolean): void {
        this.action('declare', [name, value.value, type, isConst])
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
        this.action('set', [name, value.value])
        this.variables.get(name)!.value = value
    }

    get(name: string): Value {
        this.action('get', [name])
        return this.variables.get(name)!.value
    }

    function(name: string, executable: Executable): void {
        this.variables.set(name, new Variable(new FunctionValue(executable), Types.Function, true))
    }

    apply(extension: (context: Context) => void): void {
        extension(this)
    }
}