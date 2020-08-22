
import { describe, expect, it } from '@jest/globals'
import { JournalEntry } from '../src/JournalEntry'
import { DateString } from '../src/dateString'
import { render } from '@testing-library/react'
import { Journal } from '../src/journal'
import * as React from 'react'
import { selectAnEntry } from './interactions'

const entries: JournalEntry[] = [
  new JournalEntry(
    new DateString('2020-07-18T22:10:06Z'),
    'should be this text'
  ),
  new JournalEntry(new DateString('2020-07-17T23:10:06Z'),
    'and not this text'
  )]

describe('the editor pane', function () {
  it('shows the rendered content', function () {
    const { container } = render(<Journal entries={entries} />)
    selectAnEntry(container, '2020-07-18')

    const renderPane = container.querySelector('.editor .rendered')
    expect(renderPane.textContent).toEqual('should be this text')
  })

  it('shows the text in a textarea', function () {
    const { container } = render(<Journal entries={entries} />)
    selectAnEntry(container, '2020-07-18')

    const textarea = container.querySelector('.editor .edit-pane textarea')
    expect(textarea.textContent).toEqual('should be this text')
  })
})
