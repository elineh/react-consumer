// put CT-only commands here

import ErrorComponent from '@components/error-component'
import LoadingMessage from '@components/loading-message'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type {MountOptions} from 'cypress/react18'
import {mount} from 'cypress/react18'
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import './commands'

Cypress.Commands.add('mount', mount)

const wrappedMount = (WrappedComponent: React.ReactNode, options = {}) => {
  const wrapped = (
    <QueryClientProvider client={new QueryClient()}>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Suspense fallback={<LoadingMessage />}>{WrappedComponent}</Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )

  return mount(wrapped, options)
}

Cypress.Commands.add('wrappedMount', wrappedMount)

const routeWrappedMount = (
  WrappedComponent: React.ReactNode,
  options?: {
    route?: string
    path?: string
    cypressOptions?: MountOptions
  },
) => {
  const {route = '/', path = '/', cypressOptions = {}} = options || {}
  // Sets the browser's url to match the route (for any code checking window.location)
  window.history.pushState({}, 'Test Page', route)

  const routerWrappedComp = (
    // MemoryRouter is used to simulate the router
    // initialEntries is used to set the initial url
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        {/* Inside the MemoryRouter, this tells React Router: "When the URL matches path, render WrappedComponent." */}
        <Route element={WrappedComponent} path={path} />
      </Routes>
    </MemoryRouter>
  )
  // Compose into wrappedMount
  return wrappedMount(routerWrappedComp, cypressOptions)
}
Cypress.Commands.add('routeWrappedMount', routeWrappedMount)
