import MovieForm from '@components/movie-form'
import MovieDetails from '@components/movie-details/movie-details'
import MovieList from '@components/movie-list'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom'
import type {ErrorResponse, Movie} from './consumer'

type AppRoutesProps = Readonly<{
  movies: Movie[] | ErrorResponse | undefined
  onDelete: (id: number) => void
}>

export default function AppRoutes({movies, onDelete}: AppRoutesProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/movies"
          element={<MovieListWithForm movies={movies} onDelete={onDelete} />}
        />
        <Route path="/" element={<Navigate to="/movies" replace />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

/**
 * Renders both MovieList and MovieForm on the "/movies" route.
 * @component
 * @param {Object} props
 * @param {Movie[] | ErrorResponse | undefined} props.movies
 * @param {function} props.onDelete
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <MovieListWithForm movies={moviesArray} onDelete={handleDeleteMovie} />
 * ```
 */

function MovieListWithForm({movies, onDelete}: AppRoutesProps) {
  const [searchParams] = useSearchParams()
  const movieName = searchParams.get('name')
  return movieName ? (
    <MovieDetails />
  ) : (
    <>
      <MovieList movies={movies} onDelete={onDelete} />
      <MovieForm />
    </>
  )
}
