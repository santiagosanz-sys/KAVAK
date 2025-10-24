import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { QuoteWizard } from './pages/Quote/QuoteWizard';
import { Offers } from './pages/Offers';
import { VehicleTechnical } from './pages/VehicleTechnical';
import { Results } from './pages/Results';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quote" element={<QuoteWizard />} />
        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle-technical"
          element={
            <ProtectedRoute>
              <VehicleTechnical />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
