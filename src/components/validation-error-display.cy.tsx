import {z} from 'zod'
import ValidationErrorDisplay from './validation-error-display'

describe('<ValidationErrorDisplay />', () => {
  it('should not render when there is no validation error', () => {
    cy.wrappedMount(<ValidationErrorDisplay validationError={null} />)
    cy.getByCy('validation-error').should('not.exist')
  })

  it('should render validation errors correctly', () => {
    const schema = z.object({
      name: z.string().min(1),
      year: z.number(),
    })
    const result = schema.safeParse({name: undefined, year: 'not a number'})
    const mockError = !result.success ? result.error : null

    cy.wrappedMount(<ValidationErrorDisplay validationError={mockError} />)

    cy.getByCy('validation-error').should('have.length', 2)
  })
})
