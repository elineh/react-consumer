import {useMovie} from './use-movies'
import {useParams, useSearchParams} from 'react-router-dom'

export function useMovieDetail() {
  // Get the id from the route params or query params
  // .../movies/{{movieId}}
  const {id} = useParams<{id: string}>()
  // .../movies?name={{movieName}}
  const [searchParams] = useSearchParams()
  const movieName = searchParams.get('name')

  const identifier =
    movieName ?? (id && !isNaN(Number(id)) ? parseInt(id, 10) : null)
  const {data, isLoading} = useMovie(identifier as number | string)
  if (!identifier) return {movie: null, isLoading: false, hasIdentifier: false}

  return {data, isLoading, hasIdentifier: true}
}
