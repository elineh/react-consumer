import styled from 'styled-components'
import type {Movie} from 'src/consumer'
import MovieEditForm from './movie-edit-form'
import {SButton} from '@styles/styled-components'
import {MovieInfo} from '@components/movie-item'
import {useState} from 'react'

export type MovieManagerProps = {
  readonly movie: Movie
  readonly onDelete: (id: number) => void
}

export default function MovieManager({movie, onDelete}: MovieManagerProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <SMovieManager>
      {isEditing ? (
        <MovieEditForm movie={movie} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <MovieInfo movie={movie} />
          <SButton data-cy="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </SButton>
          <SButton data-cy="delete-button" onClick={() => onDelete(movie.id)}>
            Delete
          </SButton>
        </>
      )}
    </SMovieManager>
  )
}

const SMovieManager = styled.div`
  h2 {
    margin-top: 20px;
    color: #333;
    font-size: 24px;
  }
  p {
    font-size: 18px;
    color: #555;
  }
`
