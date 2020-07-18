import * as React from "react";
import {Listing} from "./journal";

const cyrb53 = function(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
    h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

export interface EntryListProps {
    listings: Listing[];
}

interface EntryProps { listing: Listing }

const Entry = (props: EntryProps) => {
    return (
        <div key={cyrb53(props.listing.text)} className="entry">
            {props.listing.text}
        </div>
    )
}

interface DateGroupProps {
    date: string, listings: Listing[]
}

const DateGroup = (props: DateGroupProps) => {
    return (
        <div className="date" key={props.date} data-date={props.date}>
            {props.listings.map(l => <Entry listing={l}/>)}
        </div>
    )
}

export const EntryList = (props: EntryListProps) => {

    const initial: { [dateKey: string]: Listing[] } = {}
    const listingByDate: { [dateKey: string]: Listing[] }
        = props.listings.reduce((acc, l) => {
        const dateKey = l.date.split('T')[0]
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(l)
        return acc
    }, initial)

    return (
        <div className="listing">
            {Object.keys(listingByDate)
                .map(dk => (<DateGroup date={dk} listings={listingByDate[dk]}/>))}
        </div>
    )
}
