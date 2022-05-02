import Token from "../lexer/token";
import { Position } from "../position";
import errors from './errors.json'

export class BaseError extends Error {
    constructor(
        code: keyof typeof errors,
        args: any[] = []
    ) {
        super(format(errors[code].message, args))
    }
}

export class RuntimeError extends BaseError {
    constructor(
        public code: keyof typeof errors,
        public position: Position,
        public args: any[] = []
    ) {
        super(code, args)
    }
}

export class ParseError extends BaseError {
    constructor(
        public code: keyof typeof errors,
        public token: Token,
        public args: any[] = []
    ) { 
        super(code, args)
    }
}

export class LexerError extends BaseError {
    constructor(
        public code: keyof typeof errors,
        public row: number,
        public column: number,
        public args: any[] = []
    ) { 
        super(code, args)
        console.error('LexerError:', row, column);
    }
}


export class BreakError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BreakError";
    }
}


export class ContinueError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ContinueError";
    }
}

export class ReturnError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ReturnError";
    }
}

function format (message: string, args: any[]) {
    var formatted = message;
    for (var i = 0; i < args.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, args[i]);
    }
    return formatted;
};