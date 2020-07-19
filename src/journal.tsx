import * as React from 'react'
import {EntryList} from './entryList'
import {JournalEntry} from './JournalEntry'
import {selectAnEntry} from "../test/interactions";

export interface JournalProps {
    entries: JournalEntry[];
}

interface EditorProps {
    selectedEntry: JournalEntry
}

function safelyReadText(props: EditorProps) {
    return props.selectedEntry && props.selectedEntry.text || "";
}

const EditorPane = (props: EditorProps) => {
    const styles = {
        flexGrow: 1,
        backgroundColor: 'white',
        height: '96%'
    }

    const initialState = safelyReadText(props);
    console.log({
        initialState,
        selected: props.selectedEntry
    })
    const [entryText, setEntryText] = React.useState(initialState)

    React.useEffect(() => {
        const text = safelyReadText(props);
        if (text !== entryText) {
            setEntryText(text);
        }
    }, [props.selectedEntry]);

    const renderedText = props.selectedEntry && props.selectedEntry.text || ""

    const textChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value
        setEntryText(newText)
    }

    return (
        <div style={styles} className="editor">
            <div className="edit-pane">
                <label>
                    Journal Entry
                    <textarea
                        value={entryText}
                        onChange={textChanged}/>
                </label>
            </div>
            <div className="rendered">
                {renderedText}
            </div>
        </div>
    )
}

export const Journal = (props: JournalProps) => {
    const [selectedEntry, setSelectedEntry] = React.useState(null);

    const styles = {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'grey',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div style={styles}>
            <EntryList entries={props.entries} selectEntry={setSelectedEntry}
                       selectedEntry={selectedEntry}/>
            <EditorPane selectedEntry={selectedEntry}/>
        </div>
    )
}
