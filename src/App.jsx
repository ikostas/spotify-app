import React, { useState, useEffect } from 'react';
import SearchBar from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './styles/app.module.css';
import {mockDataTracks, mockDataSearchResults} from './mockdata';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [accessCreds, setAccessCreds] = useState({});
  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', import.meta.env.VITE_CID);
    params.append('client_secret', import.meta.env.VITE_CSECRET);
    const url = import.meta.env.VITE_BASEURL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const refreshBuffer = 15; // seconds, renew the token before it expires
      const newAccessCreds={
        token: data.access_token,
        life: data.expires_in,
        end: Date.now() + (data.expires_in - refreshBuffer) * 1000
      };
      setAccessCreds(newAccessCreds);
      return newAccessCreds.token;
    } catch (err) {
      console.error('Error fetching Spotify token:', err);
    }
  }
  const checkUpdateToken = async () => {
    if(!accessCreds.end || Date.now() > accessCreds.end) {
      const newToken = await getAccessToken();
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
      playlist.forEach(song => spotifyPlaylist.push(song.uri));
      setPlaylist([]);
    }
  }
  const handleLinkClick = (e, id, isPlaylistTrack) => {
    e.preventDefault();
    if (isPlaylistTrack) {
      const trackToAdd = playlist.find(track => track.id === id);

      // check if track is in search results
      // if not, add to search results
      // if it is, do not add track to search results
      // finally, remove the track from the playlist
      if (trackToAdd && !searchResults.some(track => track.id === id)){
        setSearchResults([trackToAdd, ...searchResults]);
      }
      setPlaylist(playlist => playlist.filter(song => song.id !== id));
    } else {
      const trackToAdd = searchResults.find(track => track.id === id);

      // remove the track from search results
      // add the track to the playlist
      if(trackToAdd){
        setSearchResults(searchResults => searchResults.filter(song => song.id !== id));
        setPlaylist([trackToAdd, ...playlist]);
      }
    }
  }

  const getData = async (update = null) => {
    if(!update) {
      setPlaylist(mockDataTracks);
      setSearchResults(mockDataSearchResults);
    } else {


    }
  }
  useEffect(() => getData, []);

  return (
    <>
      <SearchBar 
        tokenCheck={checkUpdateToken}/>
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
