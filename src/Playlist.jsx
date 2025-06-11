import React, {useState} from 'react';
import Track from './Track';
import styles from './styles/playlist.module.css';

function Playlist({playlist, onTrackAction, onPlaylistAction}) {
  const [playlistName, setPlaylistName] = useState('');
  const handleNameChange = e => setPlaylistName(e.target.value);
  return (
    <div className={styles.playlist}>
      <h3>Add songs to your Spotify playlist:</h3>
      <form>
        <fieldset>
          <label htmlFor="playListName">Enter the name for your playlist:</label>
          <input type="text" name="playListName" id="playListName" placeholder="Playlist name" aria-label="Enter playlist name" value={playlistName} onChange={handleNameChange} />
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
          uri={track.uri}
        />
      ))}
      <button className={styles.spotifySave} onClick={(e) => onPlaylistAction(e, playlistName)}>Save to Spotify</button>
    </div>
  )
}

export default Playlist;
