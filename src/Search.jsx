import React, {useState} from 'react';

function SearchBar({tokenCheck}) {
  const [searchQuery, setSearch] = useState('');
  const handleChange = e => {
    const currentQuery = e.target.value;
    setSearch(currentQuery);
    if(currentQuery.length > 3) search(currentQuery);
  }
  const search = async query => {
    const token = await tokenCheck();
    const searchParams = new URLSearchParams();
    searchParams.append('q', query);
    searchParams.append('type', 'track');
    searchParams.append('limit', '10');
    const searchUrl = import.meta.env.VITE_SEARCHURL + '?' + searchParams.toString();
    try {
      const response = await fetch(searchUrl , { method: 'GET',
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
      const formattedTracks = [];

      if (data && data.tracks && Array.isArray(data.tracks.items)) {
        data.tracks.items.forEach(track => {
          // Extract artist names: Spotify returns an array of artist objects
          const artistNames = track.artists.map(artist => artist.name).join(', ');

          const newTrack = {
            id: track.id,
            trackName: track.name,
            artist: artistNames,
            album: track.album.name,
            uri: track.uri,
          };

          formattedTracks.push(newTrack);
        });
        
      } else {
        console.warn("Spotify API response did not contain expected track data structure.");
      }
    } catch (err) {
      console.error('Error fetching Spotify token:', err);
    }
  }
  return (
    <form>
      <fieldset>
        <label htmlFor="search">Search:</label>
        <input type="text" name="search" id="search" placeholder="Search text" aria-label="Search text"
        value={searchQuery}
        onChange={handleChange} />
        <input type="submit" value="Search" />
      </fieldset>
    </form>
  )
}

export default SearchBar;
