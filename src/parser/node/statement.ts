import Context from "../../runtime/context";
import ASTNode from "./node";

export default interface Statement extends ASTNode {
    execute(context: Context): void;
}