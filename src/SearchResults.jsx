import React, { useState } from 'react';
import Track from './Track';

const mockTracks = [
  { id: '1', trackName: 'Midnight City', artist: 'M83' },
  { id: '2', trackName: 'Blinding Lights', artist: 'The Weeknd' },
  { id: '3', trackName: 'Stairway to Heaven', artist: 'Led Zeppelin' },
  { id: '4', trackName: 'Bohemian Rhapsody', artist: 'Queen' },
  { id: '5', trackName: 'Smells Like Teen Spirit', artist: 'Nirvana' },
];

function SearchResults() {
  return(
    <div className="searchResults">
      <h3>Search Results:</h3>
      {mockTracks.map((track) => (
      <Track 
        key={track.id}
        trackName={track.trackName}
        artist={track.artist}
      />
      ))}
    </div>
  );
}

export default SearchResults;
