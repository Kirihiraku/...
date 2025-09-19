import { use, useEffect, useState } from 'react'
import './App.css'
import Movie from './components/movie/Movie'
import { genres } from './components/utils/genres'

function App() {
  const [movie, setMovie] = useState("")
  const [score, setScore] = useState(2)
  const [movies, setMovies] = useState(() => {
    return JSON.parse(
      localStorage.getItem("movies")
    ) || []
  })
  const [desc, setDesc] = useState("")
  const [genre, setGenre] = useState(Object.entries(genres)[0][0])
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [filterString, setFilterString] = useState("")

  useEffect(() => {
    setFilteredMovies(movies.filter((movie) => movie.name.includes(filterString)))
  }, [filterString, movies])


  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies))
  }, [movies])

  useEffect(() => {
    setMovies(JSON.parse(
      localStorage.getItem("movies")
  ))},[])
  const handleAdd = (e) => {
    e.preventDefault()
    const newMovie = {
      id: crypto.randomUUID(),
      name: movie,
      score,
      genre: "Драма",
      desc
    }
    setMovies((oldValue) => [newMovie, ...oldValue])
    setMovie("")
    setScore(2)
    setDesc("")
  }

  return (
    <div className="app">
      <h1>Movie DB</h1>
      <form onSubmit={handleAdd} action="" className="movie-form">
        <input type="text" onChange={(value) => setMovie(value.target.value)} value={movie} />
        <input type="range" name="" id="" min={0} max={4} value={score} onChange={(v) => setScore(v.target.value)} />
        {+score + 1}
        <select value={genre} onChange={(value) => setGenre(value.target.value)}>
          {Object.entries(genres).map((genre) => (
            <option value={genre[0]}>{genre[1]}
            </option>
          ))}
        </select>
        <textarea value={desc} onChange={(value) => setDesc(value.target.value)}></textarea>
        <button className="add-movie">Добавить</button>
      </form>
      <div className="search">
        <h2>Поиск</h2>
        <input type="text" value={filterString} onChange={
          (v) => setFilterString(v.target.value)
        } />
      </div>
      <div className="movie-list">
        {filteredMovies.map((el) => (
          <Movie key={el.id} {...el} />
        ))}
      </div>
    </div>
  )
}

export default App
