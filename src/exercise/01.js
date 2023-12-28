// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// Extra Credit 1 (add initialName)
function Greeting({initialName = ""}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  // Extra Credit 1 (add initialName)
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  // Extra Credit 1 (add initialName)
  return <Greeting initialName="Anthony (initial name)" />
}

export default App
