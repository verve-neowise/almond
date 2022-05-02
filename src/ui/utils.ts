import { TokenType } from "../parser/lexer"

export const colors = new Map<TokenType, string>([
    [TokenType.FOR, "keyword"],
    [TokenType.IF, "keyword"],
    [TokenType.LET, "keyword"],
    [TokenType.REPEAT, "keyword"],
    [TokenType.BREAK, "keyword"],
    [TokenType.CONTINUE, "keyword"],
    [TokenType.CONST, "keyword"],
    [TokenType.RETURN, "keyword"],
    [TokenType.STRING, "string"],
    [TokenType.NUMBER, "number"],
    [TokenType.LPAREN, "operator"],
    [TokenType.RPAREN, "operator"],
    [TokenType.EQ, "operator"],
    [TokenType.COLON, "operator"],
    [TokenType.COMMENT, "operator"],
])

export function getClass(tokenType: TokenType): string {
    return colors.get(tokenType)
}

// list of html whitespace characters
let whitespaceMap = new Map<string, string>(
    [
        [' ', '&nbsp;'],
        ['\n', '<br>'],
        ['\t', '&nbsp;&nbsp;&nbsp;&nbsp;'],
        ['\r', '<br>']
    ]
)

export function generateWhitespace(text: string) {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        result += whitespaceMap.get(text[i]) || text[i]
    }
    return result
}
