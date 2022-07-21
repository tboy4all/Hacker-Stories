import React, { useState, useEffect, useReducer, useCallback } from 'react'
import axios from 'axios'

import styles from './App.module.css'

import List from './components/List'
import Search from './components/Search'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

// const initialStories = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//     going: true,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//     going: false,
//   },
// ]

// const getAsyncStories = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
//   )

// const getAsyncStories = (withData) =>
//   new Promise((resolve, reject) =>
//     setTimeout(
//       () =>
//         (withData ? resolve : reject)({ data: { stories: initialStories } }),
//       2000
//     )
//   )

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState)

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  // const handleInputValueChange = (e) => {
  //   setValue(e.target.value)
  // }

  // return [value, handleInputValueChange]
  return [value, setValue]
}

// const storiesReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_STORIES':
//       return action.payload
//     case 'REMOVE_STORY':
//       return state.filter((story) => action.payload.objectID !== story.objectID)
//     default:
//       throw new Error()
//   }
// }

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      }
    default:
      throw new Error()
  }
}

function App() {
  // const title = 'Taiye Ajanaku'

  // const [searchTerm, setSearchTerm] = useState(
  //   localStorage.getItem('search') || 'React'
  // )

  // useEffect(() => {
  //   localStorage.setItem('search', searchTerm)
  // }, [searchTerm])

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log({ value: e.target.value })
  //   setSearchTerm(e.target.value)

  //   // props.onSearch(e)
  // }

  // const [searchTerm, handleInputValueChange] = useSemiPersistentState(
  //   'search',
  //   'React'
  // )
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')

  // const [stories, setStories] = useState([])
  // const [stories, dispatchStories] = useReducer(storiesReducer, [])
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState(false)

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)

  // const url = `${API_ENDPOINT}${searchTerm}`
  // console.log({ url })

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  })

  // const fetchStories = (resolve = false) => {
  //   console.log('FETCHING STORIES...')
  //   dispatchStories({ type: 'STORIES_FETCH_INIT' })

  //   getAsyncStories(resolve)
  //     .then((result) => {
  //       dispatchStories({
  //         type: 'STORIES_FETCH_SUCCESS',
  //         payload: result.data.stories,
  //       })
  //     })
  //     .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))
  // }

  // useEffect(() => {
  //   setIsLoading(true)

  //   getAsyncStories()
  //     .then((res) => {
  //       setStories(res.data.stories)
  //       setIsLoading(false)
  //     })
  //     .catch(() => setIsError(true))
  // }, [])

  // useEffect(() => {
  //   setIsLoading(true)

  //   getAsyncStories()
  //     .then((res) => {
  //       dispatchStories({
  //         type: 'SET_STORIES',
  //         payload: res.data.stories,
  //       })
  //       setIsLoading(false)
  //     })
  //     .catch(() => setIsError(true))
  // }, [])

  // useEffect(fetchStories, [])

  // const handleRemoveStory = (item) => {
  //   const newStories = stories.filter(
  //     (story) => item.objectID !== story.objectID
  //   )
  //   setStories(newStories)
  // }

  // useEffect(() => {
  //   if (searchTerm === '') return

  //   dispatchStories({ type: 'STORIES_FETCH_INIT' })

  //   fetch(`${API_ENDPOINT}${searchTerm}`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.hits })
  //     })
  //     .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))
  // }, [searchTerm])

  const handleFetchStories = useCallback(async () => {
    // if (!searchTerm) return

    dispatchStories({ type: 'STORIES_FETCH_INIT' })

    // fetch(`${API_ENDPOINT}${searchTerm}`)
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.hits })
    //   })
    //   .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }))

    try {
      const result = await axios.get(url)

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      })
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    }
  }, [url])

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)

    e.preventDefault()
  }

  // const searchedStories = stories.data.filter((story) =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
      <Search
        search={searchTerm}
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      />{' '}
      <br />
      <button
        type='button'
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
        className={`${styles.button} ${styles.buttonLarge}`}
      >
        Submit
      </button>
      {/* <hr /> */}
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List lists={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      <br />
      <br />
      {/* <button onClick={fetchStories.bind(null, true)}>Fetch (Success)</button>
      {'  '}
      <button onClick={fetchStories.bind(null, false)}>Fetch (Fail)</button> */}
    </div>
  )
}

export default App
