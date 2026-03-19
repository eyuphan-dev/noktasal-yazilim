import { Outlet } from 'react-router-dom'
import BackToTopButton from '../components/common/BackToTopButton'
import SiteFooter from '../components/common/SiteFooter'
import SiteHeader from '../components/common/SiteHeader'

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <BackToTopButton />
      <SiteFooter />
    </div>
  )
}

export default PublicLayout
