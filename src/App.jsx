import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isLogged ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={() => setIsLogged(true)} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isLogged ? <Dashboard /> : <Navigate to="/" />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App