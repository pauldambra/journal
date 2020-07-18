import * as React from "react";
import {cyrb53} from "./fancyHash";
import {DateString} from "./dateString";
import {Listing} from "./JournalEntry";

export interface EntryListProps {
    listings: Listing[];
}

interface EntryProps {
    listing: Listing
}

const Entry = (props: EntryProps) => {
    console.log({
        props
    }, 'making entry')
    const hashedTitle = cyrb53(props.listing.title);
    return (
        <div key={hashedTitle} className="entry">
            {props.listing.title}
        </div>
    )
}

interface DateGroupProps {
    date: string,
    listings: Listing[]
}

const DateGroup = (props: DateGroupProps) => {
    return (
        <div className="date" key={props.date} data-date={props.date}>
            {props.listings.map(l => <Entry listing={l}/>)}
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

    const initial: { [dateKey: string]: Listing[] } = {}
    const listingByDate: { [dateKey: string]: Listing[] }
        = props.listings.reduce((acc, l) => {
        const dateKey = asDateKey(l.date)
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(l)
        return acc
    }, initial)

    const styles = {
        borderRight: "black 5px solid",
        width: "10%",
        backgroundColor: "white",
        height: "96%",
    }

    return (
        <div className="listing" style={styles}>
            {Object.keys(listingByDate)
                .map(dk =>
                    (<DateGroup date={dk} listings={listingByDate[dk]}/>))}
        </div>
    )
}
