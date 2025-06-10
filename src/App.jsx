import SearchBar from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from './styles/app.module.css';

function App() {
  return (
    <>
      <SearchBar />
      <div className={styles.tworows}>
        <SearchResults />
        <Playlist />
      </div>
    </>
  )
}

export default App;
