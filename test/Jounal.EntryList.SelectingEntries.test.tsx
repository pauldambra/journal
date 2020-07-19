import {fireEvent, render} from '@testing-library/react'
import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { Journal } from '../src/journal'
import { DateString } from '../src/dateString'
import { JournalEntry } from '../src/JournalEntry'

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
    const day = container.querySelector('.listing [data-date="2020-07-18"]')
    const entry = day.querySelector('.entry')

    fireEvent.click(entry)

    expect(entry.classList).toContain("selected")
  })
})
