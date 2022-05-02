import { extensions, SimpleContext } from "../lib";
import { Action, Event, Visualize } from "../lib/simple.context";
import { Lexer, Source, Token } from "../parser/lexer";
import Parser from "../parser/parser";

export class CodeRunner {

    private context: SimpleContext;
    private delay: number;
    private interval: any

    private _onaction: (action: Action) => void
    private _onvisualize: (visualize: Visualize) => void

    private events: (Action | Visualize)[] = []

    constructor(delay: number = 0) {
        this.delay = delay;
        this.context = new SimpleContext((event) => this.events.push(event));
        this.context.apply(extensions.stdlib)
    }

    public run(code: string) {

        const lexer = new Lexer(new Source(code))
        let program = new Parser(lexer.tokenize()).parse()

        try {
            program.execute(this.context)
        }
        catch (e) {
            console.error(e)
        }

        let interval = setInterval(() => {
            
            if (this.events.length === 0) {
                clearInterval(this.interval)
                this._onaction( { name: 'end', type: "action", values: [] } )
                return
            }

            let event = this.events.shift()

            if (event.type === 'action' && this._onaction) {
                this._onaction(event)
            }
            else if (event.type === 'visualize' && this._onvisualize) {
                this._onvisualize(event)
            }
        }, this.delay)
    }

    stop() {
        this.events = []
    }

    public set onaction(value: (action: Action) => void) {
        this._onaction = value
    }

    public set onvisualize(value: (visualize: Visualize) => void) {
        this._onvisualize = value
    }
}