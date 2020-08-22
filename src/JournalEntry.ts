import { DateString } from './dateString'

const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    c => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })

export class JournalEntry {
  /* eslint-disable no-useless-constructor */
  constructor (
        readonly date: DateString,
        public text: string,
        readonly id: string = uuidv4()) {
  }

  slug () {
    return this.text.substring(0, 7) + '...'
  }
}
