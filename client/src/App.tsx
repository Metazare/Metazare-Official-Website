import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import Base from './Layouts/Base/Base';

// Pages
import Default from './Pages/Default/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import LandingPage from './Pages/LandingPage/LandingPage';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';


// Test
import { Auth } from './Config/Components/Login';

function App() {
  return (
    <Routes>
      <Route element={<Base />} >
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/register" element={<Register/>} />
      </Route>

      {/* Sample usage of Protected Route */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
        <Route path="/private" element={<Default/>} />
      </Route>

    </Routes>
  );
}

export default App;