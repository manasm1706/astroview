import { useEffect, useState } from 'react'
import './Dashboard.css'

interface ApodData {
  title: string
  url: string
  explanation: string
  media_type: string
}

export default function Dashboard() {
  const [apod, setApod] = useState<ApodData | null>(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then((r) => r.json())
      .then((data) => setApod(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const visibilityScore = 82
  const moonPhase = 'Waxing Crescent'
  const moonIllumination = 34
  const nextIssPass = '7:42 PM'
  const meteorActivity = 'Low'
  const solarActivity = 'Moderate'
  const asteroidsToday = 5
  const weatherStatus = 'Clear Skies'

  const formatCountdown = () => {
    const target = new Date()
    target.setHours(19, 42, 0, 0)
    if (target.getTime() < time.getTime()) target.setDate(target.getDate() + 1)
    const diff = target.getTime() - time.getTime()
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return `${h}h ${m}m ${s}s`
  }

  const getVisibilityLabel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: '#00FF88' }
    if (score >= 60) return { label: 'Good', color: '#00F5FF' }
    if (score >= 40) return { label: 'Moderate', color: '#FFB800' }
    return { label: 'Poor', color: '#FF4C4C' }
  }

  const vis = getVisibilityLabel(visibilityScore)

  return (
    <div className="dashboard">
      {/* ── Top Bar ── */}
      <div className="dash-topbar">
        <div className="dash-location">
          <span className="dash-location-dot" />
          <span>Mumbai, India</span>
          <span className="dash-time">{time.toLocaleTimeString()}</span>
        </div>
        <div className="dash-vis-badge" style={{ borderColor: vis.color + '40' }}>
          <span className="dash-vis-dot" style={{ background: vis.color }} />
          Sky Visibility: {visibilityScore}/100 — {vis.label}
        </div>
      </div>

      {/* ── What's Above You Tonight ── */}
      <div className="dash-section-title">
        <h2>🌌 What's Above You Tonight?</h2>
      </div>

      <div className="dash-cards-hero">
        <div className="dash-card dash-card-iss">
          <div className="dash-card-icon">🛰️</div>
          <div className="dash-card-label">Next ISS Pass</div>
          <div className="dash-card-value">{nextIssPass}</div>
          <div className="dash-card-sub">in {formatCountdown()}</div>
        </div>
        <div className="dash-card dash-card-moon">
          <div className="dash-card-icon">🌙</div>
          <div className="dash-card-label">Moon Phase</div>
          <div className="dash-card-value">{moonPhase}</div>
          <div className="dash-card-sub">{moonIllumination}% illumination</div>
        </div>
        <div className="dash-card dash-card-meteor">
          <div className="dash-card-icon">🌠</div>
          <div className="dash-card-label">Meteor Activity</div>
          <div className="dash-card-value">{meteorActivity}</div>
          <div className="dash-card-sub">No major showers tonight</div>
        </div>
        <div className="dash-card dash-card-sky">
          <div className="dash-card-icon">🌤️</div>
          <div className="dash-card-label">Sky Visibility</div>
          <div className="dash-card-value" style={{ color: vis.color }}>
            {visibilityScore}/100
          </div>
          <div className="dash-vis-bar">
            <div
              className="dash-vis-fill"
              style={{ width: `${visibilityScore}%`, background: vis.color }}
            />
          </div>
        </div>
      </div>

      {/* ── APOD + Quick Summary ── */}
      <div className="dash-grid-2">
        <div className="dash-card dash-card-apod">
          <div className="dash-card-label">📸 Astronomy Picture of the Day</div>
          {apod ? (
            <>
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="apod-img" />
              ) : (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="apod-iframe"
                  allowFullScreen
                />
              )}
              <h3 className="apod-title">{apod.title}</h3>
              <p className="apod-desc">
                {apod.explanation?.slice(0, 180)}...
              </p>
            </>
          ) : (
            <div className="apod-loading">Loading NASA APOD...</div>
          )}
        </div>

        <div className="dash-card-stack">
          <div className="dash-card">
            <div className="dash-card-icon">☀️</div>
            <div className="dash-card-label">Solar Activity</div>
            <div className="dash-card-value">{solarActivity}</div>
            <div className="dash-card-sub">Kp Index: 3</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-icon">☄️</div>
            <div className="dash-card-label">Near-Earth Asteroids</div>
            <div className="dash-card-value">{asteroidsToday} today</div>
            <div className="dash-card-sub">None hazardous</div>
          </div>
          <div className="dash-card">
            <div className="dash-card-icon">🌦️</div>
            <div className="dash-card-label">Weather Status</div>
            <div className="dash-card-value">{weatherStatus}</div>
            <div className="dash-card-sub">23°C · Humidity 65%</div>
          </div>
        </div>
      </div>

      {/* ── Smart Summary ── */}
      <div className="dash-smart-summary">
        <div className="dash-smart-icon">🧠</div>
        <div className="dash-smart-text">
          <strong>Smart Summary:</strong> Clear skies tonight with excellent
          viewing conditions. ISS visible at {nextIssPass}. Moon is{' '}
          {moonPhase.toLowerCase()} at {moonIllumination}% illumination —
          minimal light interference for stargazing.
        </div>
      </div>
    </div>
  )
}
