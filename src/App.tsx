import { Routes, Route } from 'react-router-dom'
import './App.css'

import LandingPage from './pages/LandingPage'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import SkyEvents from './pages/SkyEvents'
import SpaceImpact from './pages/SpaceImpact'
import LiveTracker from './pages/LiveTracker'

function App() {
  return (
    <Routes>
      {/* Landing page — standalone, no navbar/footer layout */}
      <Route path="/" element={<LandingPage />} />

      {/* Inner pages — shared Navbar + Footer via Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sky-events" element={<SkyEvents />} />
        <Route path="/space-impact" element={<SpaceImpact />} />
        <Route path="/live-tracker" element={<LiveTracker />} />
      </Route>
    </Routes>
  )
}

export default App
