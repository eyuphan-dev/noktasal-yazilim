import AppProviders from './app/providers/AppProviders'
import { useSoftWheelScroll } from './app/hooks/useSoftWheelScroll'
import AppRouter from './app/router/AppRouter'

function App() {
  useSoftWheelScroll()

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App
