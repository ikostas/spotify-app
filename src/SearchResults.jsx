import React from 'react';
import Track from './Track';
import styles from './styles/searchResults.module.css';

function SearchResults({searchResults}) {
  return(
    <div className={styles.searchResults}>
      <h3>Search Results:</h3>
      {searchResults.map((track) => (
        <Track 
          key={track.id}
          trackName={track.trackName}
          artist={track.artist}
          album={track.album}
          isPlaylistTrack={false}
        />
      ))}
    </div>
  );
}

export default SearchResults;
