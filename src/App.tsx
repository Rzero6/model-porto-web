import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Admin from './pages/Admin';
import Login from './pages/Login';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App
