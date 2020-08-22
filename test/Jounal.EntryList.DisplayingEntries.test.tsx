import { render } from '@testing-library/react'
import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { Journal } from '../src/journal'
import { DateString } from '../src/dateString'
import { JournalEntry } from '../src/JournalEntry'

describe('the journal entries are listed', function () {
  it('shows an empty list when there are none', () => {
    const { container } = render(<Journal entries={[]} />)

    const listing = container.querySelector('.listing')
    const listingEntries = listing.querySelectorAll('.entry')
    expect(listingEntries).toHaveLength(0)
  })
  it('shows a single entry under its date', () => {
    const entry = new JournalEntry(new DateString('2020-07-11T22:10:06Z'), 'tomat', '')

    const { container } = render(<Journal entries={[entry]} />)

    const listing = container.querySelector('.listing [data-date="2020-07-11"]')
    const listingEntries = listing.querySelectorAll('.entry')
    expect(listingEntries).toHaveLength(1)
    expect(listingEntries[0].textContent).toEqual('tomat...')
  })

  it('shows a single entry under its date and truncates longer text', () => {
    const entry = new JournalEntry(new DateString('2020-07-11T22:10:06Z'), '1234567890', '')

    const { container } = render(<Journal entries={[entry]} />)

    const listing = container.querySelector('.listing [data-date="2020-07-11"]')
    const listingEntries = listing.querySelectorAll('.entry')
    expect(listingEntries).toHaveLength(1)
    expect(listingEntries[0].textContent).toEqual('1234567...')
  })

  it('shows a several entries from one day under the same date', () => {
    const entries: JournalEntry[] = [
      new JournalEntry(new DateString('2020-07-17T22:10:06Z'),
        'one',
        ''
      ),
      new JournalEntry(new DateString('2020-07-17T23:10:06Z'),
        'two',
        ''
      )]
    const { container } = render(<Journal entries={entries} />)
    const listing = container.querySelector('.listing [data-date="2020-07-17"]')
    const listingEntries = listing.querySelectorAll('.entry')
    expect(listingEntries).toHaveLength(2)
    expect(listingEntries[0].textContent).toEqual('one...')
    expect(listingEntries[1].textContent).toEqual('two...')
  })

  it('shows a several entries under their different dates', () => {
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

    const first = container.querySelector('.listing [data-date="2020-07-17"]')
    const firstListingEntry = first.querySelectorAll('.entry')
    expect(firstListingEntry).toHaveLength(1)
    expect(firstListingEntry[0].textContent).toEqual('two...')

    const second = container.querySelector('.listing [data-date="2020-07-18"]')
    const secondListingEntry = second.querySelectorAll('.entry')
    expect(secondListingEntry).toHaveLength(1)
    expect(secondListingEntry[0].textContent).toEqual('one...')
  })
})
