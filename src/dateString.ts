export class MustBeAValidDateString extends Error {
    constructor(dateString: string) {
        super(`"${dateString}" is not a valid date string. it should be an ISO-8601 string`);
    }
}

export class DateString {
    private readonly ds: string

    constructor(s: string) {
        if (Number.isNaN(Date.parse(s))) {
            throw new MustBeAValidDateString(s)
        }

        this.ds = s
    }

    asString() {
        return this.ds
    }

    withoutTime() {
        return this.ds.split("T")[0];
    }
}
