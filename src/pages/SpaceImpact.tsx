import './SpaceImpact.css'

export default function SpaceImpact() {
  return (
    <div className="space-impact">
      <div className="impact-header">
        <h1>🌍 Space Impact</h1>
        <p>How space weather and orbital activity affect life on Earth.</p>
      </div>

      {/* ── Section 1: Weather Impact ── */}
      <section className="impact-section">
        <h2>🌦️ Weather Impact</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🌧️</span>
              <span className="impact-status status-low">Low Risk</span>
            </div>
            <h3>Rain Forecast</h3>
            <p>Light drizzle expected tomorrow evening. No significant rainfall in the next 48 hours.</p>
            <div className="impact-meter">
              <div className="impact-meter-fill" style={{ width: '20%', background: '#00F5FF' }} />
            </div>
            <span className="impact-meter-label">Precipitation: 20%</span>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🌡️</span>
              <span className="impact-status status-moderate">Moderate</span>
            </div>
            <h3>Heatwave Alert</h3>
            <p>Temperatures 3°C above seasonal average. Stay hydrated and avoid prolonged sun exposure.</p>
            <div className="impact-meter">
              <div className="impact-meter-fill" style={{ width: '55%', background: '#FFB800' }} />
            </div>
            <span className="impact-meter-label">Heat Index: Moderate</span>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">☁️</span>
              <span className="impact-status status-low">Clear</span>
            </div>
            <h3>Cloud Movement</h3>
            <p>Sparse high-altitude cirrus clouds moving east. Clear skies expected for stargazing tonight.</p>
            <div className="impact-meter">
              <div className="impact-meter-fill" style={{ width: '15%', background: '#00FF88' }} />
            </div>
            <span className="impact-meter-label">Cloud Cover: 15%</span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Disaster Awareness ── */}
      <section className="impact-section">
        <h2>⚠️ Disaster Awareness</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🌊</span>
              <span className="impact-status status-low">No Warning</span>
            </div>
            <h3>Heavy Rainfall</h3>
            <p>No heavy rainfall warnings active for your region. Seasonal averages remain normal.</p>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🌀</span>
              <span className="impact-status status-low">No Threat</span>
            </div>
            <h3>Storm Risk</h3>
            <p>No tropical depressions or cyclone activity detected in your region.</p>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">💨</span>
              <span className="impact-status status-moderate">Advisory</span>
            </div>
            <h3>Wind Alerts</h3>
            <p>Wind gusts up to 45 km/h expected. Secure loose outdoor items.</p>
            <div className="impact-meter">
              <div className="impact-meter-fill" style={{ width: '45%', background: '#FFB800' }} />
            </div>
            <span className="impact-meter-label">Wind: 45 km/h gusts</span>
          </div>
        </div>
      </section>

      {/* ── Section 3: Solar Activity ── */}
      <section className="impact-section">
        <h2>☀️ Solar Activity</h2>
        <div className="impact-grid">
          <div className="impact-card impact-card-wide">
            <div className="impact-card-top">
              <span className="impact-icon">📡</span>
              <span className="impact-status status-moderate">Active</span>
            </div>
            <h3>Kp Index — Geomagnetic Activity</h3>
            <p>Current Kp Index is 3.0, indicating unsettled geomagnetic conditions. Minor radio propagation issues possible.</p>
            <div className="kp-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
                <div
                  key={level}
                  className={`kp-block ${level <= 3 ? 'kp-active' : ''}`}
                  style={{
                    background:
                      level <= 3
                        ? level <= 2
                          ? '#00FF88'
                          : '#FFB800'
                        : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {level}
                </div>
              ))}
            </div>
            <div className="kp-labels">
              <span>Quiet</span>
              <span>Active</span>
              <span>Storm</span>
              <span>Severe</span>
            </div>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🌌</span>
              <span className="impact-status status-low">Unlikely</span>
            </div>
            <h3>Aurora Possibility</h3>
            <p>Aurora activity is unlikely at your latitude. Visible primarily above 60°N tonight.</p>
            <div className="impact-meter">
              <div className="impact-meter-fill" style={{ width: '10%', background: '#7B61FF' }} />
            </div>
            <span className="impact-meter-label">Aurora chance: 10%</span>
          </div>

          <div className="impact-card">
            <div className="impact-card-top">
              <span className="impact-icon">🔆</span>
              <span className="impact-status status-low">Normal</span>
            </div>
            <h3>Solar Flare Activity</h3>
            <p>No significant solar flare activity in the past 24 hours. X-ray flux within normal range.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
