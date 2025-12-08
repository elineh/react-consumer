import MovieItem from './movie-item'

describe('MovieItem', () => {
  it('should verify the movie and delete', () => {
    // Using routeWrappedMount for more advanced mounting due to error with regular mount and routing
    cy.routeWrappedMount(
      <MovieItem
        id={1}
        name="Test Movie"
        year={2023}
        rating={8.5}
        onDelete={cy.stub().as('onDelete')}
      />,
    )

    cy.getByCy('movie-item-comp')
      .contains('Test Movie (2023) 8.5')
      .should('have.attr', 'href')
      .and('include', '/movies/1')

    // Test delete button
    cy.getByCyLike('delete-movie').click()
    cy.get('@onDelete').should('have.callCount', 1)
  })
})
