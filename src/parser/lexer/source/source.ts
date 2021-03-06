export type Rollback = {
    position: number;
    row: number;
    column: number;
}

export class Source {

    private source: string;

    position: number = 0
    row: number = 0
    column: number = 0


    confirmedRow = 0
    confirmedColumn = 0

    length: number;

    constructor(source: string) {
        this.source = source;
        this.length = source.length;
    }

    confirm() {
        this.confirmedRow = this.row
        this.confirmedColumn = this.column
    }

    end(): boolean {
        return this.position >= this.length;
    }

    next(): string {
        this.position++;
        
        let result = this.peek(0);
        
        if (result === '\n') {
            this.row++;
            this.column = 0;
        }
        else {
            this.column++;
        }
        return result;
    }

    peek(relative: number): string {
        let position = this.position + relative
        if (position < 0 || position >= this.length) {
            return '\u0000'
        }
        return this.source.charAt(position)
    }

    rollback(): Rollback {
        return {
            position: this.position,
            row: this.row,
            column: this.column
        }
    }

    restore(rollback: Rollback) {
        this.position = rollback.position;
        this.row = rollback.row;
        this.column = rollback.column;
    }

    positionToString() {
        return `${this.row}:${this.column}`
    }
}