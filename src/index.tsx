import * as React from 'react'
import { hydrate } from 'react-dom'

const ConsoleLog = function () {
  React.useEffect(() => { console.log('hello world') }, [])
  return <p>hello</p>
}

hydrate(<ConsoleLog />, document.getElementById('root'))
