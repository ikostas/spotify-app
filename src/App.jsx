import React, { useState, useEffect } from 'react';
import SearchBar from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './styles/app.module.css';
import {mockDataTracks, mockDataSearchResults} from './mockdata';
import {getAccessToken} from './spotifyAuth';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [accessCreds, setAccessCreds] = useState({});
  const checkUpdateToken = async () => {
    if(!accessCreds.end || Date.now() > accessCreds.end) {
      const newToken = await getAccessToken(setAccessCreds);
      return newToken;
    }
    return accessCreds.token;
  }
  const handlePLSave = (e, playlistName) => {
    e.preventDefault();
    if(!playlistName.trim() || playlist.length === 0) {
      alert('Tracklist name or tracklist is empty!');
    } else {
      const spotifyPlaylist = [];
      playlist.forEach(track => spotifyPlaylist.push(track.uri));
      setPlaylist([]);
    }
  }
  const handleLinkClick = (e, id, isPlaylistTrack) => {
    e.preventDefault();
    if (isPlaylistTrack) {
      const trackToAdd = playlist.find(track => track.id === id);

      // check if track is in search results and add to search results
      // remove the track from the playlist
      if (trackToAdd && !searchResults.some(track => track.id === id)){
        setSearchResults([trackToAdd, ...searchResults]);
      }
      setPlaylist(playlist => playlist.filter(track => track.id !== id));
    } else {
      const trackToAdd = searchResults.find(track => track.id === id);

      // add the track to the playlist, if it's not there
      // remove the track from search results
      if(trackToAdd && !playlist.some(track => track.id === id)){
        setPlaylist([trackToAdd, ...playlist]);
      }
      setSearchResults(searchResults => searchResults.filter(track => track.id !== id));
    }
  }

  const getData = async (update = null) => {
    if(!update) {
  // for example: useEffect(() => getData, []);
      setPlaylist(mockDataTracks);
      setSearchResults(mockDataSearchResults);
    } else { // get real data from API
      setSearchResults(update);
    }
  }

  return (
    <>
      <SearchBar 
        pushTracks={getData}
        tokenCheck={checkUpdateToken} />
      <div className={styles.tworows}>
        <SearchResults 
          searchResults={searchResults}
          onTrackAction={handleLinkClick} />
        <Playlist playlist={playlist} 
          onTrackAction={handleLinkClick} 
          onPlaylistAction={handlePLSave} />
      </div>
    </>
  )
}

export default App;
