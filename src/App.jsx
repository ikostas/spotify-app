import React, { useState, useEffect } from 'react';
import SearchBar from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './styles/app.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const handleLinkClick = (e, id, isPlaylistTrack) => {
    e.preventDefault();
    console.log('Track ID: ', id);
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

  const getData = async () => {
    const mockDataTracks = [
      {
        "id": "6",
        "trackName": "Hotel California",
        "artist": "Eagles",
        "album": "Hotel California"
      },
      {
        "id": "7",
        "trackName": "Billie Jean",
        "artist": "Michael Jackson",
        "album": "Thriller"
      },
      {
        "id": "8",
        "trackName": "Like a Rolling Stone",
        "artist": "Bob Dylan",
        "album": "Highway 61 Revisited"
      },
      {
        "id": "9",
        "trackName": "Hey Jude",
        "artist": "The Beatles",
        "album": "Past Masters, Vol. 2"
      },
      {
        "id": "10",
        "trackName": "One",
        "artist": "U2",
        "album": "Achtung Baby"
      }
    ]
    const mockDataSearchResults = [
      {
        "id": "1",
        "trackName": "Midnight City",
        "artist": "M83",
        "album": "Hurry Up, We're Dreaming"
      },
      {
        "id": "2",
        "trackName": "Blinding Lights",
        "artist": "The Weeknd",
        "album": "After Hours"
      },
      {
        "id": "3",
        "trackName": "Stairway to Heaven",
        "artist": "Led Zeppelin",
        "album": "Led Zeppelin IV"
      },
      {
        "id": "4",
        "trackName": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night at the Opera"
      },
      {
        "id": "5",
        "trackName": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "album": "Nevermind"
      }
    ]
    // In a real application, you'd fetch data from an API like this:
      // const response1 = await fetch('YOUR_API_ENDPOINT_FOR_TRACKS');
      // const actualTracks = await response1.json();
      // const response2 = await fetch('YOUR_API_ENDPOINT_FOR_SEARCH_RESULTS');
      // const actualSearchResults = await response2.json();

      setPlaylist(mockDataTracks);
      setSearchResults(mockDataSearchResults);
    }
  useEffect(() => getData, []);

  return (
    <>
      <SearchBar />
      <div className={styles.tworows}>
        <SearchResults 
          searchResults={searchResults}
          onTrackAction={handleLinkClick} />
        <Playlist playlist={playlist} 
          onTrackAction={handleLinkClick} />
      </div>
    </>
  )
}

export default App;
