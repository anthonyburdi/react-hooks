// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

import {ErrorBoundary} from 'react-error-boundary'

// Extra Credit Status
// 1. Done
// 2. Done
// 3. Done
// 4. Done
// 5. Done
// 6. Done

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }
  static getDerivedStateFromError(error) {
    return {hasError: true, error: error}
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error)
    }
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [error, setError] = React.useState()
  const [state, setState] = React.useState({status: 'idle', pokemon: null})
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.

  const {status, pokemon} = state

  React.useEffect(() => {
    if (pokemonName) {
      setState({status: 'pending', pokemon: null})
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({status: 'resolved', pokemon: pokemonData})
        })
        .catch(error => {
          setError(error)
          setState({status: 'rejected'})
        })
    }
  }, [pokemonName])
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  let returnVal = ''
  if (status === 'rejected') {
    throw error
  } else if (status === 'idle') {
    returnVal = 'Submit a pokemon'
  } else if (status === 'pending') {
    returnVal = <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'resolved') {
    returnVal = <PokemonDataView pokemon={pokemon} />
  }
  return returnVal
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  // Example solution shows this as a new component instead of a function
  // Is there a preference / best practice?
  function errorDisplay(error) {
    return (
      <div role="alert">
        There was an error:
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  function fallbackRender({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        There was an error:
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* <MyErrorBoundary key={pokemonName} fallback={errorDisplay}> */}
        <ErrorBoundary fallbackRender={fallbackRender}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
        {/* </MyErrorBoundary> */}
      </div>
    </div>
  )
}

export default App
