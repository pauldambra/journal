import {DateString} from './dateString'

const uuidv4 = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        c => {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

export class JournalEntry {
    constructor(
        readonly date: DateString,
        readonly title: string,
        readonly text: string,
        readonly id: string = uuidv4()) {
    }
}
