import React, { useState } from 'react';
import styles from './styles/track.module.css';

function Track({id, trackName, artist}) {
  return(
    <div className={styles.track} id={id}>
<div className={styles.trackInfo}>
        <h4 className={styles.trackName}>{trackName}</h4>
        <p className={styles.artist}>{artist}</p>
      </div>
      <div className={styles.trackAdd}>+</div>
  </div>
  );
}

export default Track;
