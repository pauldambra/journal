import * as React from 'react'
import { hydrate } from 'react-dom'
import { Journal } from './journal'
import { DateString } from './dateString'
import { JournalEntry } from './JournalEntry'

const a = new JournalEntry(new DateString('2020-07-18T22:10:06Z'),
  'one',
  'firsty'
)
const b = new JournalEntry(new DateString('2020-07-17T23:10:06Z'),
  'two',
  'secondy'
)
hydrate(<Journal entries={[a, b]} />, document.getElementById('root'))
