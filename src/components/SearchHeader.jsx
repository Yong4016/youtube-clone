import React, { useState, useEffect } from 'react';
import { FaYoutube } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link, useParams } from 'react-router-dom';

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { query } = useParams();
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${searchQuery}`);
  };

  useEffect(() => {
    setSearchQuery(query || '');
  }, [query]);

  return (
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
      <Link
        to='/'
        className='flex items-center hover:-skew-x-6 ease-in duration-300'
      >
        <FaYoutube className='text-4xl text-brand' />
        <h1 className='font-bold  ml-2 text-2xl'>Youtube</h1>
      </Link>
      <form
        className='w-full flex justify-center'
        onSubmit={handleSubmit}
      >
        <input
          className='w-7/12 p-2 outline-none rounded-s-xl bg-black text-gray-5 '
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleChange}
        />
        <button
          className='bg-zinc-600 px-4 rounded-e-xl hover:bg-brand ease-in duration-300'
          type='submit'
        >
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchHeader;
