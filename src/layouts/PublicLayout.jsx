import { Outlet } from 'react-router-dom'
import BackToTopButton from '../components/common/BackToTopButton'
import PageSeoSync from '../components/common/PageSeoSync'
import SiteFooter from '../components/common/SiteFooter'
import SiteHeader from '../components/common/SiteHeader'

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <PageSeoSync />
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
