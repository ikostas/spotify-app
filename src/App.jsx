import React, { useState, useEffect } from 'react';
import SearchBar from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './styles/app.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const handlePLSave = (e, playlistName) => {
    e.preventDefault();
    if(!playlistName.trim()) {
      alert('Tracklist name is empty!');
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

  const getData = async () => {
    const mockDataTracks = [
      {
        "id": "6",
        "trackName": "Hotel California",
        "artist": "Eagles",
        "album": "Hotel California",
        "uri": "spotify:track:40riOy7x9W7GXjyGp4pjAv"
      },
      {
        "id": "7",
        "trackName": "Billie Jean",
        "artist": "Michael Jackson",
        "album": "Thriller",
        "uri": "spotify:track:7J1uxwnxfQLu4APicE5Rnj"
      },
      {
        "id": "8",
        "trackName": "Like a Rolling Stone",
        "artist": "Bob Dylan",
        "album": "Highway 61 Revisited",
        "uri": "spotify:track:3AhXZa8sUQht0UEdBJgpGc"
      },
      {
        "id": "9",
        "trackName": "Hey Jude",
        "artist": "The Beatles",
        "album": "Past Masters, Vol. 2",
        "uri": "spotify:track:1eT2CjXwFXNx6oY5ydvzKU"
      },
      {
        "id": "10",
        "trackName": "One",
        "artist": "U2",
        "album": "Achtung Baby",
        "uri": "spotify:track:3G69vJMWsX6ZohTykad2AU"
      }
    ]
    const mockDataSearchResults = [
      {
        "id": "1",
        "trackName": "Midnight City",
        "artist": "M83",
        "album": "Hurry Up, We're Dreaming",
        "uri": "spotify:track:6GyFP1nfCDB8lbD2bG0Hq9"
      },
      {
        "id": "2",
        "trackName": "Blinding Lights",
        "artist": "The Weeknd",
        "album": "After Hours",
        "uri": "spotify:track:0VjIjW4GlUZAMYd2vXMi3b"
      },
      {
        "id": "3",
        "trackName": "Stairway to Heaven",
        "artist": "Led Zeppelin",
        "album": "Led Zeppelin IV",
        "uri": "spotify:track:5CQ30WqJwcep0pYcV4AMNc"
      },
      {
        "id": "4",
        "trackName": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night at the Opera",
        "uri": "spotify:track:3z8h0TU7ReDPLIbEnYhWZb"
      },
      {
        "id": "5",
        "trackName": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "album": "Nevermind",
        "uri": "spotify:track:4CeeEOM32jQcH3eN9Q2dGj"
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
          onTrackAction={handleLinkClick} 
          onPlaylistAction={handlePLSave}
        />
      </div>
    </>
  )
}

export default App;
