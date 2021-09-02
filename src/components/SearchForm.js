import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const searchInput = React.useRef('')
  const { setSearchTerm } = useGlobalContext()

  const handleSearch = () => {
    setSearchTerm(searchInput.current.value)
  }

  useEffect(() => {
    searchInput.current.focus()
  }, [])

  // Enter'a basıldığında refresh'lemenin olmaması için ekleniyor.
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            id='name'
            name='name'
            ref={searchInput}
            onChange={handleSearch}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
