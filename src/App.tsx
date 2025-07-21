import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/provider/AuthProvider'
import { ThemeProvider } from '@/provider/theme-provider'
import TanStackQueryProvider from '@/provider/TanstackProvider'
import { Inter } from '@/lib/fonts'
import PresentationDashboardPage from '@/pages/presentation/PresentationDashboardPage'
import PresentationViewPage from '@/pages/presentation/PresentationViewPage'
import PresentationGeneratePage from '@/pages/presentation/PresentationGeneratePage'
import SignInPage from '@/pages/auth/SignInPage'
import SignOutPage from '@/pages/auth/SignOutPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <TanStackQueryProvider>
      <AuthProvider>
        <div className={`${Inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Routes>
              <Route path="/" element={<Navigate to="/presentation" replace />} />
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/auth/signout" element={<SignOutPage />} />
              <Route path="/presentation" element={
                <ProtectedRoute>
                  <PresentationDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/presentation/generate/:id" element={
                <ProtectedRoute>
                  <PresentationGeneratePage />
                </ProtectedRoute>
              } />
              <Route path="/presentation/:id" element={
                <ProtectedRoute>
                  <PresentationViewPage />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </div>
      </AuthProvider>
    </TanStackQueryProvider>
  )
}

export default App