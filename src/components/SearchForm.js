import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchVal = React.useRef('');

  const updateSearch = () => {
    setSearchTerm(searchVal.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    searchVal.current.focus();
  }, []);

  return (
    <section className='section search'>
      <form onSubmit={submitHandler} className='search-form'>
        <div className='form-control'>
          <label htmlFor='name'>Search your favorite cocktails</label>
          <input
            type='text'
            id='name'
            ref={searchVal}
            onChange={updateSearch}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
