import {DateString} from "./dateString";

export interface Listing {
    date: DateString,
    title: string,
    text: string
}

export class JournalEntry implements Listing {
    date: DateString;
    text: string;
    title: string;
}
