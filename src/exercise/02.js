// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  initialValue = '',
  serialize = JSON.stringify,
  deserialize = JSON.parse,
) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [state, setState] = React.useState(
    // Extra Credit 1 - use function to get initial value for useState (inline):
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue
    },
  )

  // Store prev key (in case key changes). Use a ref so that we don't trigger a re-render
  // if the value changes.
  const prevKeyRef = React.useRef(key)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    console.log('updating name in local storage')
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      console.log(`updating key from ${prevKey} to ${key}`)
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

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
