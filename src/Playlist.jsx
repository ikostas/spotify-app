import React from 'react';
import Track from './Track';
import styles from './styles/playlist.module.css';

function Playlist({playlist, onTrackAction}) {
  return (
    <div className={styles.playlist}>
      <h3>Add songs to your Spotify playlist:</h3>
      <form>
        <fieldset>
          <label htmlFor="playListName">Enter the name for your playlist:</label>
          <input type="text" name="playListName" id="playListName" placeholder="Playlist name" aria-label="Enter playlist name" />
        </fieldset>
      </form>
      {playlist.map((track) => (
        <Track 
          key={track.id}
          id={track.id}
          trackName={track.trackName}
          artist={track.artist}
          album={track.album}
          isPlaylistTrack={true}
          onTrackAction={onTrackAction}
        />
      ))}
      <button className={styles.spotifySave}>Save to Spotify</button>
    </div>
  )
}

export default Playlist;
