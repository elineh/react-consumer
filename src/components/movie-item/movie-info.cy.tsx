import MovieInfo from './movie-info'

describe('<MovieInfo />', () => {
  it('should verify the movie and delete', () => {
    const id = 3
    const name = 'Inception'
    const year = 2010
    const rating = 8.5
    const movie = {id, name, year, rating}
    // const props = {movie}
    // cy.mount(<MovieInfo {...props} />) same as the solution we have selected

    cy.mount(<MovieInfo movie={movie} />)

    cy.contains(id).should('be.visible')
    cy.contains(name).should('be.visible')
    cy.contains(year).should('be.visible')
    cy.contains(rating).should('be.visible')
  })
})
