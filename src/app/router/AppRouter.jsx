import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../features/auth/ProtectedRoute'

const AdminLayout = lazy(() => import('../../layouts/AdminLayout'))
const PublicLayout = lazy(() => import('../../layouts/PublicLayout'))
const AdminDashboardPage = lazy(() => import('../../pages/admin/AdminDashboardPage'))
const AdminContentPage = lazy(() => import('../../pages/admin/AdminContentPage'))
const AdminFormsPage = lazy(() => import('../../pages/admin/AdminFormsPage'))
const AdminLoginPage = lazy(() => import('../../pages/admin/AdminLoginPage'))
const AdminReferencesPage = lazy(() => import('../../pages/admin/AdminReferencesPage'))
const AdminSeoPage = lazy(() => import('../../pages/admin/AdminSeoPage'))
const AdminSolutionsPage = lazy(() => import('../../pages/admin/AdminSolutionsPage'))
const AboutPage = lazy(() => import('../../pages/public/AboutPage'))
const CareerPage = lazy(() => import('../../pages/public/CareerPage'))
const ContactPage = lazy(() => import('../../pages/public/ContactPage'))
const DesignComparisonPage = lazy(() => import('../../pages/public/DesignComparisonPage'))
const HomePage = lazy(() => import('../../pages/public/HomePage'))
const ReferencesPage = lazy(() => import('../../pages/public/ReferencesPage'))
const SolutionDetailPage = lazy(() => import('../../pages/public/SolutionDetailPage'))
const SolutionsPage = lazy(() => import('../../pages/public/SolutionsPage'))
const NotFoundPage = lazy(() => import('../../pages/system/NotFoundPage'))

function RouteLoader() {
  return (
    <div className="container-shell py-20 text-sm font-medium text-slate-600">Sayfa yükleniyor...</div>
  )
}

function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="hakkimizda" element={<AboutPage />} />
            <Route path="cozumler" element={<SolutionsPage />} />
            <Route path="cozumler/:slug" element={<SolutionDetailPage />} />
            <Route path="referanslar" element={<ReferencesPage />} />
            <Route path="kariyer" element={<CareerPage />} />
            <Route path="iletisim" element={<ContactPage />} />
            <Route path="tasarim-karsilastirma" element={<DesignComparisonPage />} />
          </Route>

          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute roles={['super_admin', 'editor']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="solutions" element={<AdminSolutionsPage />} />
            <Route path="references" element={<AdminReferencesPage />} />
            <Route path="forms" element={<AdminFormsPage />} />
            <Route
              path="seo"
              element={
                <ProtectedRoute roles={['super_admin']}>
                  <AdminSeoPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
