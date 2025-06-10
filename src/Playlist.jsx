import React from 'react';
import Track from './Track';
import styles from './styles/playlist.module.css';

const mockTracks = [
  { id: '6', trackName: 'Hotel California', artist: 'Eagles' },
  { id: '7', trackName: 'Billie Jean', artist: 'Michael Jackson' },
  { id: '8', trackName: 'Like a Rolling Stone', artist: 'Bob Dylan' },
  { id: '9', trackName: 'Hey Jude', artist: 'The Beatles' },
  { id: '10', trackName: 'One', artist: 'U2' },
];

function Playlist() {
  return (
    <div className={styles.playlist}>
      <h3>Add songs to your Spotify playlist:</h3>
      <form>
        <fieldset>
          <label htmlFor="playListName">Enter the name for your playlist:</label>
          <input type="text" name="playListName" id="playListName" placeholder="Playlist name" aria-label="Enter playlist name" />
        </fieldset>
      </form>
      {mockTracks.map((track) => (
        <Track 
          key={track.id}
          trackName={track.trackName}
          artist={track.artist}
          isPlaylistTrack={true}
        />
      ))}
      <button className={styles.spotifySave}>Save to Spotify</button>
    </div>
  )
}

export default Playlist;
