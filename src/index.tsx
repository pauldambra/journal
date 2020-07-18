import * as React from 'react'
import { hydrate } from 'react-dom'
import { Journal } from './journal'

hydrate(<Journal listings={[]} />, document.getElementById('root'))
