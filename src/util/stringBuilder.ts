enum PrefixType {
    NewLine = '\n',
    Space = ' ',
    Nothing = ''
}

class StringBuilder
{
    private value: string;

    constructor (value?: string) {
        this.value = value || '';
    }

    public append(value?: string, prefix: PrefixType = PrefixType.NewLine) {
        if (undefined === value) {
            return;
        }

        if (value.length == 0 && prefix === PrefixType.NewLine) {
            this.value += '\n';
        }
        else if (value.length > 0) {
            this.value += `${prefix}${value}`;
        }
    }

    public toString(): string {
        return this.value;
    }
}

export default StringBuilder;
export { PrefixType };