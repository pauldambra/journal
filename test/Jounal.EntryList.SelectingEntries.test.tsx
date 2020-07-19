import {fireEvent, render} from '@testing-library/react'
import {describe, expect, it} from '@jest/globals'
import * as React from 'react'
import {Journal} from '../src/journal'
import {DateString} from '../src/dateString'
import {JournalEntry} from '../src/JournalEntry'
import {selectAnEntry} from "./interactions";

describe('the journal entries are listed', function () {

  it('clicking one selects it in the listing view', () => {
    const entries: JournalEntry[] = [
      new JournalEntry(new DateString('2020-07-18T22:10:06Z'),
        'one',
        ''
      ),
      new JournalEntry(new DateString('2020-07-17T23:10:06Z'),
        'two',
        ''
      )]

    const { container } = render(<Journal entries={entries} />)
    const entry = selectAnEntry(container, "2020-07-18")
    expect(entry.classList).toContain("selected")
  })

  it('only one entry can be selected at a time', () => {
    const entries: JournalEntry[] = [
      new JournalEntry(new DateString('2020-07-18T22:10:06Z'),
          'one',
          ''
      ),
      new JournalEntry(new DateString('2020-07-17T23:10:06Z'),
          'two',
          ''
      )]

    const { container } = render(<Journal entries={entries} />)
    const entry = selectAnEntry(container, '2020-07-18');
    const theOtherEntry = selectAnEntry(container, '2020-07-17');

    fireEvent.click(entry)
    expect(entry.classList).toContain("selected")
    expect(theOtherEntry.classList).not.toContain("selected")

    fireEvent.click(theOtherEntry)
    expect(theOtherEntry.classList).toContain("selected")
    expect(entry.classList).not.toContain("selected")
  })
})
