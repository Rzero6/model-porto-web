import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthProvider';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={
          <AuthProvider>
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          </AuthProvider>
        } />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App
