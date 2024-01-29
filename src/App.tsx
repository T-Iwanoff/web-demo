import {FormEvent, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function AlbumPicker() {
    const [albums, setAlbums] = useState<{ title: string; releaseDate: string }[]>([]);
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            artist: { value: string };
        };
        const artist = encodeURIComponent(target.artist.value);
        const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
        const response = await fetch(url);
        const mbResult = await response.json();

        const releases = mbResult.releases.map(({ title, 'release-events': releaseEvents }) => {
            const releaseDate = releaseEvents?.[0]?.date || 'Unknown';
            return { title, releaseDate };
        });

        setAlbums(releases);
        console.log('mbResult', mbResult);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Artist name:
                <input name="artist" />
            </label>
            <button type="submit">Search</button>
            <p>Albums:</p>
            <ol>
                {albums.map((album, index) => (
                    <li key={index}>
                        {album.title} - Release Date: {album.releaseDate}
                    </li>
                ))}
            </ol>
        </form>
    );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite and React</h1>
      <AlbumPicker />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
