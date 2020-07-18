import * as React from "react";
import {EntryList} from "./entryList";

export interface Listing {
    date: string,
    text: string
}

export interface JournalProps { listings: Listing[]; }

export const Journal = (props: JournalProps) => {
    return (
        <div>
            <EntryList listings={props.listings}/>
        </div>
    )
}
