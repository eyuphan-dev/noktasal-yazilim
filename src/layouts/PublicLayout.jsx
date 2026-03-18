import { Outlet } from 'react-router-dom'
import SiteFooter from '../components/common/SiteFooter'
import SiteHeader from '../components/common/SiteHeader'

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default PublicLayout
