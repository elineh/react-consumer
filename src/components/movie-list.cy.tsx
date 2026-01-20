import {generateMovie} from '@cypress/support/factories'
import MovieList from './movie-list'

describe('<MovieList />', () => {
  it('should show nothing with no movies', () => {
    cy.routeWrappedMount(
      <MovieList movies={[]} onDelete={cy.stub().as('onDelete')} />,
    )
    cy.getByCy('movie-list-comp').should('not.exist')
  })

  it('should show error with error response', () => {
    // The MovieList component expects an onDelete prop (a callback function).
    // In tests, you don't want to use the real delete logic—you just want to:
    // 1. Provide a function so the component renders without errors.
    // 2. Verify that the function is called when the delete button is clicked.
    cy.routeWrappedMount(
      <MovieList
        movies={{error: 'boom'}}
        onDelete={cy.stub().as('onDelete')}
      />,
    )

    cy.getByCy('movie-list-comp').should('not.exist')
    cy.getByCy('error').should('be.visible')
  })

  it('should verify the movie and delete', () => {
    const movie1 = {id: 1, ...generateMovie()}
    const movie2 = {id: 2, ...generateMovie()}
    cy.routeWrappedMount(
      <MovieList
        movies={[movie1, movie2]}
        onDelete={cy.stub().as('onDelete')}
      />,
    )

    cy.getByCy('movie-list-comp').should('be.visible')
    cy.getByCy('movie-item-comp').should('have.length', 2)
  })
})
