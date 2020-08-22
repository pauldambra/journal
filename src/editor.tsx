import { JournalEntry } from './JournalEntry'
import * as React from 'react'

interface EditorProps {
    selectedEntry: JournalEntry
}

const safelyReadText = (props: EditorProps) =>
  props.selectedEntry && (props.selectedEntry.text || '')

export const EditorPane = (props: EditorProps) => {
  const initialState = safelyReadText(props)
  console.log({
    initialState,
    selected: props.selectedEntry
  })
  const [entryText, setEntryText] = React.useState(initialState)

  React.useEffect(() => {
    const text = safelyReadText(props)
    if (text !== entryText) {
      setEntryText(text)
    }
  }, [props.selectedEntry])

  const renderedText = safelyReadText(props)

  const textChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setEntryText(newText)
    props.selectedEntry.text = newText
  }

  const editorStyle = {
    flexGrow: 1,
    backgroundColor: 'white',
    height: '96%'
  }

  // here's some fun. need to declare this is the immutable string "column
  // for some reason typescript can't use the regular string ¯\_(ツ)_/¯
  const flexDirection: 'column' = 'column'
  const editWrapperStyle = {
    display: 'flex',
    flexDirection: flexDirection
  }

  const paneStyle = {
    width: '93%',
    margin: '1% 2%',
    height: '90%'
  }

  const textAreaStyle = {
    width: '93%',
    margin: '1% 2%',
    height: '90%'
  }

  return (
    <div style={editorStyle} className='editor'>
      <div style={editWrapperStyle}>
        <div className='edit-pane' style={paneStyle}>
          <label>
                        Journal Entry
            <textarea
              style={textAreaStyle}
              value={entryText}
              onChange={textChanged}
            />
          </label>
        </div>
        <div className='rendered' style={paneStyle}>
          {renderedText}
        </div>
      </div>
    </div>
  )
}
