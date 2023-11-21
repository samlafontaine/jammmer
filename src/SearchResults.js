import React from 'react';
import styles from './SearchResults.module.css';

function SearchResults({ suggestions, addToPlaylist }) {
  const handleAddToPlaylist = (selectedSong) => {
    addToPlaylist(selectedSong);
  };

  return (
    <div className={styles.searchResultsContainer}>
      <h2>Search Results</h2>
      <ul className={styles.listItems}>
        {suggestions.map((song, index) => (
          <li key={index}>
            {`${song.name} · ${song.artist} `}
            <button onClick={() => handleAddToPlaylist(song)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
