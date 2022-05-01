import { Context, Types, Value } from "../../runtime";
import Void from "../../runtime/value/void";

export default (context: Context) => {
    context.function('print', (context, args) => {
        let value = (args.map(arg => arg.value))
        context.action('print', undefined, value);
        return new Void()
    })

    context.function('multiply', (context, args) => {
        return new Value(args[0].value * args[1].value, Types.Number)
    })
}