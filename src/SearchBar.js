import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [playlist, setPlaylist] = useState([]);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setSearchTerm(userInput);
  };

  useEffect(() => {
    // Function to fetch access token from Spotify API
    const getAccessToken = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa('f91b2c0e18dc49dda5a509b1903afc31:5212654d5f174eef96f8b0a3174ff7ce')}`,
        },
        body: 'grant_type=client_credentials',
      });

      const data = await response.json();
      setAccessToken(data.access_token);
    };

    getAccessToken(); // Call the function to get access token when the component mounts
  }, []);

  useEffect(() => {
    if (searchTerm && accessToken) {
      // Fetch suggestions from Spotify API based on user input and access token
      fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=25`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Extract song suggestions from API response and update state
          if (data.tracks && data.tracks.items) {
            const suggestedSongs = data.tracks.items.map((item) => ({
                name: item.name,
                artist: item.artists.map((artist) => artist.name).join(', '),}));
            setSuggestions(suggestedSongs);
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [searchTerm, accessToken]);

  const addToPlaylist = (selectedSong) => {
    const updatedPlaylist = [...playlist, selectedSong];
    setPlaylist(updatedPlaylist);
  };

  const removeFromPlaylist = (selectedSong) => {
    const updatedPlaylist = playlist.filter((song) => song !== selectedSong);
    setPlaylist(updatedPlaylist);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for songs..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.input}
      />
      <div className={styles.container}>
        <SearchResults suggestions={suggestions} addToPlaylist={addToPlaylist} />
        <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist}/>
      </div>
    </div>
  );
}

export default SearchBar;
