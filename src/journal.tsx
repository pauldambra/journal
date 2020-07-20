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

    const editorStyle = {
        flexGrow: 1,
        backgroundColor: 'white',
        height: '96%'
    }

    // here's some fun. need to declare this is the immutable string "column
    // for some reason typescript can't use the regular string ¯\_(ツ)_/¯
    const flexDirection: "column" = "column"
    const editWrapperStyle = {
        display: "flex",
        flexDirection: flexDirection
    }

    const paneStyle = {
        width: "93%",
        margin: "1% 2%",
        height: "90%"
    }

    const textAreaStyle = {
        width: "93%",
        margin: "1% 2%",
        height: "90%",
    }

    return (
        <div style={editorStyle} className="editor">
            <div style={editWrapperStyle}>
                <div className="edit-pane" style={paneStyle}>
                    <label>
                        Journal Entry
                        <textarea
                            style={textAreaStyle}
                            value={entryText}
                            onChange={textChanged}/>
                    </label>
                </div>
                <div className="rendered" style={paneStyle}>
                    {renderedText}
                </div>
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
