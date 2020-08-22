import * as React from 'react'
import { EntryList } from './entryList'
import { JournalEntry } from './JournalEntry'
import { EditorPane } from './editor'

export interface JournalProps {
    entries: JournalEntry[];
}

export const Journal = (props: JournalProps) => {
  const [selectedEntry, setSelectedEntry] = React.useState(null)

  const styles = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <div style={styles}>
      <EntryList
        entries={props.entries} selectEntry={setSelectedEntry}
        selectedEntry={selectedEntry}
      />
      <EditorPane selectedEntry={selectedEntry} />
    </div>
  )
}
