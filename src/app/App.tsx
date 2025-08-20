import { RouterProvider } from 'react-router'

import { routerConfig } from '@/shared/config/routerConfig/routerConfig'

import { AppProviders } from './providers/AppProviders'

function App() {
  return (
    <AppProviders>
      <RouterProvider router={routerConfig} />
    </AppProviders>
  )
}

export default App
