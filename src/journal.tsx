import * as React from 'react'
import { EntryList } from './entryList'
import { JournalEntry } from './JournalEntry'

export interface JournalProps {
    entries: JournalEntry[];
}

const EditorPane = () => {
  const styles = {
    flexGrow: 1,
    backgroundColor: 'white',
    height: '96%'
  }
  return (<div style={styles} />)
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
      <EntryList entries={props.entries} selectEntry={setSelectedEntry} selectedEntry={selectedEntry}/>
      <EditorPane />
    </div>
  )
}
