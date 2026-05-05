import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MedicationsProvider } from './context/MedicationsContext'
import LoginPage from './components/LoginPage'
import Dashboard from './pages/Dashboard'
import Medications from './pages/Medications'
import History from './pages/History'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  const handleLogout = () => setIsLogged(false)

  return (
    <BrowserRouter>
      <MedicationsProvider>
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
              isLogged ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/medications" 
            element={
              isLogged ? <Medications onLogout={handleLogout} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/history" 
            element={
              isLogged ? <History onLogout={handleLogout} /> : <Navigate to="/" />
            } 
          />
        </Routes>
      </MedicationsProvider>
    </BrowserRouter>
  )
}

export default App