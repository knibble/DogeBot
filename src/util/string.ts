enum Special {
    Check = '✓',
    Cross = '×'
}

surrounded('<test>', '<', '>')

function surrounded(subject: string, start: string, end?: string): boolean {
    if (undefined === end) {
        end = start;
    }

    return subject.startsWith(start) && subject.endsWith(end);
}

function unsurround(subject: string, start: string, end?: string): string {
    if (undefined === end) {
        end = start;
    }

    if (!surrounded(subject, start, end)) {
        return subject;
    }

    let withoutStart = subject.substr(start.length);
    let withoutBoth = subject.substr(withoutStart.length - end.length);

    return withoutBoth;
}

function space(times: number = 1, escaper: string = '\u00AD') {
    let space = '';

    for (let i = 0; i < times; i++) {
        space += ` ${escaper}`;
    }

    return space;
}

export { space, surrounded, unsurround, Special };