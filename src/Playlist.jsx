import React, {useState} from 'react';
import Track from './Track';
import styles from './styles/playlist.module.css';

function Playlist({playlist, onTrackAction, onPlaylistAction, tokenCheck}) {
  const [playlistName, setPlaylistName] = useState('');
  const handleNameChange = e => setPlaylistName(e.target.value);
  const getUsername = async () => {
    const token = await tokenCheck();
    const userUrl = import.meta.env.VITE_USERURL;
    try {
      const response = await fetch(userUrl, { method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.id) {
        console.log('User ID: ', data.id);
        return data.id;
      } else {
        console.warn("Spotify API response did not contain expected user data structure.");
      }
    } catch (err) {
      console.error('Error fetching Spotify token:', err);
    }
  }

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
      <button className={styles.spotifySave} onClick={getUsername}>Save to Spotify</button>
    </div>
  )
  // (e) => onPlaylistAction(e, playlistName)}
}

export default Playlist;
