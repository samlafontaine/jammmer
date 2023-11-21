import React from 'react';
import styles from './Playlist.module.css';

function Playlist({ playlist, removeFromPlaylist }) {
    const handleRemoveFromPlaylist = (selectedSong) => {
      removeFromPlaylist(selectedSong);
    };

    const downloadPlaylist = () => {
        const playlistText = playlist.map((song) => `${song.name} - ${song.artist}`).join('\n');
        const element = document.createElement('a');
        const file = new Blob([playlistText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'my_playlist.txt';
        document.body.appendChild(element); // Append anchor element to the body
        element.click(); // Simulate a click on the element
        document.body.removeChild(element); // Remove the element
    };
  
    return (
      <div className={styles.PlaylistContainer}>
        <h2>Playlist</h2>
        <ul className={styles.listItems}>
          {playlist.map((song, index) => (
            <li key={index}>
              {`${song.name} · ${song.artist} `}
              <button onClick={() => handleRemoveFromPlaylist(song)}>-</button>
            </li>
          ))}
        </ul>
        <button onClick={downloadPlaylist}>Download Playlist</button>
      </div>
    );
}
  
export default Playlist;
