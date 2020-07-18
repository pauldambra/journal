import * as React from "react";
import {EntryList} from "./entryList";
import {Listing} from "./JournalEntry";

export interface JournalProps {
    listings: Listing[];
}

const EditorPane = () => {
    const styles = {
        flexGrow: 1,
        backgroundColor: "white",
        height: "96%",
    }
    return (<div style={styles}></div>)
}

export const Journal = (props: JournalProps) => {

    const styles = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "grey",
        display: "flex",
        alignItems: "center",
    }

    return (
        <div style={styles}>
            <EntryList listings={props.listings}/>
            <EditorPane/>
        </div>
    )
}
