import React, {useState, useEffect} from 'react';
import styles from './styles/track.module.css';

function Track({id, trackName, artist, album, isPlaylistTrack, onTrackAction}) {
  const buttonSymbol = isPlaylistTrack ? '-' : '+';
  console.log('ID from Track:', id);

      /* onClick={buttonSymbol === '+' ? addSong : removeSong} */
  return (
    <div className={styles.track} id={id}>
      <div className={styles.trackInfo}>
        <h4 className={styles.trackName}>{trackName}</h4>
        <p className={styles.artist}>{artist} | {album}</p>
      </div>
      <div className={styles.trackAdd}><a href="#" className={styles.addRemove} onClick={(e) => (onTrackAction(e, id, isPlaylistTrack))}>{buttonSymbol}</a></div>
    </div>
  )
}

export default Track;
