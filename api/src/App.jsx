import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar.jsx';

function Book({ book }) {
  const coverUrl = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;

  return (
    <div className="book">
      <h3 className="title">{book.title}</h3>
      {book.author_name && (
        <p className="author">Author: {book.author_name.join(', ')}</p>
      )}
      {book.first_publish_year && (
        <p className="publish-year">
          First Publish Year: {book.first_publish_year}
        </p>
      )}
      <img src={coverUrl} alt="Book Cover" />
    </div>
  );
}

function App() {
  const [data, setData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const searchBooks = async () => {
    const url = `https://openlibrary.org/search.json?q=${searchQuery}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };

  const handleClick = () => {
    searchBooks();
  };

  return (
    <div className="app">
      <Navbar />
      <h1>The Coders Library</h1>

      <div className="search">
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for books, authors & more"
          type="text"
        />
        <button className="button" onClick={handleClick}>
          Search
        </button>
      </div>
      <div className="hero">
        <div className="hero-image">
          <img src="src/assets/book2.png" alt="Hero Image" />
        </div>
      </div>


      {data.docs && data.docs.length > 0 && (
        <div className="container">
          {data.docs.map((book) => (
            <Book key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
