import * as React from 'react'
import {cyrb53} from './fancyHash'
import {DateString} from './dateString'
import {JournalEntry} from './JournalEntry'

interface CanSelectEntry {
    selectEntry: (e: JournalEntry) => void;
    selectedEntry: JournalEntry;
}

export interface EntryListProps
    extends CanSelectEntry {
    entries: JournalEntry[];
}

interface DateGroupProps
    extends EntryListProps {
    date: string,
}

interface EntryProps
    extends CanSelectEntry{
    entry: JournalEntry;
}

const Entry = (props: EntryProps) => {

    let isSelected = props.selectedEntry == props.entry

    const select = () => {
        props.selectEntry(props.entry)
    };

    return (
        <div
            className={isSelected ? 'entry selected' : 'entry'}
            style={{backgroundColor: isSelected ? "red" : "white"}}
            onClick={select}>
            {props.entry.title}
        </div>
    )
}

const DateGroup = (props: DateGroupProps) => {
    return (
        <div className='date' data-date={props.date}>
            <h1>{props.date}</h1>
            {props.entries.map(l =>
                <Entry key={cyrb53(l.title)} entry={l}
                       selectEntry={props.selectEntry}
                       selectedEntry={props.selectedEntry}
                />)}
        </div>
    )
}

const asDateKey = (x: DateString | string): string => {
    if (x instanceof DateString) {
        return x.withoutTime()
    } else {
        return new DateString(x).withoutTime()
    }
}

export const EntryList = (props: EntryListProps) => {
    const initial: { [dateKey: string]: JournalEntry[] } = {}
    const listingByDate: { [dateKey: string]: JournalEntry[] } =
        props.entries.reduce((acc, l) => {
            const dateKey = asDateKey(l.date)
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(l)
            return acc
        }, initial)

    const styles = {
        borderRight: 'black 5px solid',
        width: '10%',
        backgroundColor: 'white',
        height: '96%'
    }

    return (
        <div className='listing' style={styles}>
            {Object.keys(listingByDate)
                .map(dk => {
                    const hashedDate = cyrb53(dk)
                    return (
                        <DateGroup key={hashedDate} date={dk}
                                   entries={listingByDate[dk]}
                                   selectEntry={props.selectEntry}
                                   selectedEntry={props.selectedEntry}
                        />)
                })}
        </div>
    )
}
