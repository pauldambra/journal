import * as React from 'react'
import { cyrb53 } from './fancyHash'
import { DateString } from './dateString'
import { JournalEntry } from './JournalEntry'
import {useState} from "react";

export interface EntryListProps {
    entries: JournalEntry[];
}

interface EntryProps {
    entry: JournalEntry
}

const Entry = (props: EntryProps) => {

    const [isSelected, setSelected] = useState(false);

    const select = () => {
        setSelected(!isSelected);
    };

  return (
    <div
        className={isSelected ? 'entry selected': 'entry'}
        style={{ backgroundColor: isSelected ? "red" : "white" }}
        onClick={select}>
      {props.entry.title}
    </div>
  )
}

interface DateGroupProps {
    date: string,
    listings: JournalEntry[]
}

const DateGroup = (props: DateGroupProps) => {
  return (
    <div className='date' data-date={props.date}>
      <h1>{props.date}</h1>
      {props.listings.map(l =>
        <Entry key={cyrb53(l.title)} entry={l} />)}
    </div>
  )
}

const asDateKey = (x: DateString | string): string => {
  if (x instanceof DateString) {
    return x.withoutTime()
  } else {
    return new DateString(x).withoutTime()
  }
}

export const EntryList = (props: EntryListProps) => {
  const initial: { [dateKey: string]: JournalEntry[] } = {}
  const listingByDate: { [dateKey: string]: JournalEntry[] } =
        props.entries.reduce((acc, l) => {
          const dateKey = asDateKey(l.date)
          if (!acc[dateKey]) {
            acc[dateKey] = []
          }
          acc[dateKey].push(l)
          return acc
        }, initial)

  const styles = {
    borderRight: 'black 5px solid',
    width: '10%',
    backgroundColor: 'white',
    height: '96%'
  }

  return (
    <div className='listing' style={styles}>
      {Object.keys(listingByDate)
        .map(dk => {
          const hashedDate = cyrb53(dk)
          return (
            <DateGroup key={hashedDate} date={dk} listings={listingByDate[dk]} />)
        })}
    </div>
  )
}
