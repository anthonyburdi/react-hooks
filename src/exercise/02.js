// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialValue = '') {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [state, setState] = React.useState(
    // Extra Credit 1 - use function to get initial value for useState (inline):
    () => window.localStorage.getItem(key) ?? initialValue,
  )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    console.log('updating name in local storage')
    window.localStorage.setItem(key, state)
  }, [key, state])

  function handleChange(event) {
    setState(event.target.value)
  }

  return [state, handleChange]
}

function Greeting({initialName = ''}) {
  const [name, handleChange] = useLocalStorageState('name', initialName)

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
  return <Greeting initialName="initial name" />
}

export default App
