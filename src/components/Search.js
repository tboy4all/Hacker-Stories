import React from 'react'
import styles from '../App.module.css'

// type SearchProps = {
//   id: string
//   label: string
//   value: string
//   onInputChange: React.ChangeEventHandler<HTMLInputElement> | undefined
// }

const InputWithLabel = ({ id, label, value, onInputChange }) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      &nbsp;
      <input
        id={id}
        type='text'
        value={value}
        onChange={onInputChange}
        className={styles.input}
      />
    </>
  )
}

const Search = ({ search, onSearch, onSearchSubmit }) => (
  // const [searchTerm, setSearchTerm] = useState('')

  // const [searchTerm, setSearchTerm] = useState('')

  // const handleSearch = (e: any) => {
  //   console.log(e.target.value)
  //   setSearchTerm(e.target.value)

  //   // props.onSearch(e)
  // }

  <form onSubmit={onSearchSubmit} className='search-form'>
    <InputWithLabel
      id='search'
      label='Search:'
      value={search}
      onInputChange={onSearch}
    />

    {/* <button type='button' disabled={!search}>
      Submit
    </button> */}

    {/* <label className='react-search' htmlFor='search'>
        Search:
      </label>
      <input id='search' type='text' value={search} onChange={onSearch} /> */}
    {/* <p>
        Searching for <strong>{props.searchTerm}</strong>.
      </p> */}
  </form>
)

export default Search
