import { useState } from 'react'
import './SkyEvents.css'

type Tab = 'today' | 'week' | 'month'

interface SkyEvent {
  name: string
  date: string
  time: string
  direction: string
  visibility: 'Excellent' | 'Good' | 'Moderate' | 'Poor'
  description: string
}

const EVENTS: Record<Tab, SkyEvent[]> = {
  today: [
    {
      name: 'ISS Pass',
      date: 'Tonight',
      time: '7:42 PM',
      direction: 'NW → SE',
      visibility: 'Excellent',
      description: 'Bright pass reaching magnitude -3.4. Look northwest and track southeast.',
    },
    {
      name: 'Jupiter Visible',
      date: 'Tonight',
      time: '8:15 PM',
      direction: 'East',
      visibility: 'Good',
      description: 'Jupiter rises in the east, visible as the brightest point in the sky.',
    },
    {
      name: 'Moon Rise',
      date: 'Tonight',
      time: '9:02 PM',
      direction: 'East',
      visibility: 'Excellent',
      description: 'Waxing crescent moon rises with 34% illumination.',
    },
  ],
  week: [
    {
      name: 'Venus at Greatest Elongation',
      date: 'Feb 16',
      time: '6:30 PM',
      direction: 'West',
      visibility: 'Excellent',
      description: 'Venus at its farthest from the Sun — best viewing opportunity this month.',
    },
    {
      name: 'ISS Double Pass',
      date: 'Feb 17',
      time: '6:55 PM & 8:31 PM',
      direction: 'SW → NE',
      visibility: 'Good',
      description: 'Two ISS passes in one evening — rare opportunity!',
    },
    {
      name: 'Constellation: Orion Peak',
      date: 'Feb 18',
      time: '10:00 PM',
      direction: 'South',
      visibility: 'Good',
      description: 'Orion constellation at peak visibility before it dips below the horizon for spring.',
    },
    {
      name: 'Satellite Flare (Iridium)',
      date: 'Feb 19',
      time: '5:48 AM',
      direction: 'NE',
      visibility: 'Moderate',
      description: 'Brief but bright satellite flare, visible for 5–8 seconds.',
    },
  ],
  month: [
    {
      name: 'Full Snow Moon',
      date: 'Feb 24',
      time: 'All Night',
      direction: 'All Sky',
      visibility: 'Excellent',
      description: 'February\'s full moon — named "Snow Moon" by Native Americans.',
    },
    {
      name: 'Mars Opposition Approach',
      date: 'Feb 28',
      time: '9:00 PM',
      direction: 'East',
      visibility: 'Good',
      description: 'Mars brightens as it approaches opposition. Best viewing conditions.',
    },
    {
      name: 'Zodiacal Light',
      date: 'Late Feb',
      time: 'After Sunset',
      direction: 'West',
      visibility: 'Moderate',
      description: 'Faint pyramid of light visible from dark sites after sunset.',
    },
  ],
}

const VIS_COLOR: Record<string, string> = {
  Excellent: '#00FF88',
  Good: '#00F5FF',
  Moderate: '#FFB800',
  Poor: '#FF4C4C',
}

export default function SkyEvents() {
  const [tab, setTab] = useState<Tab>('today')

  return (
    <div className="sky-events">
      <div className="sky-header">
        <h1>🌠 Sky Events</h1>
        <p>Discover what's visible in your sky — tonight and beyond.</p>
      </div>

      {/* ── Tabs ── */}
      <div className="sky-tabs">
        {(['today', 'week', 'month'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`sky-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'today' ? 'Tonight' : t === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* ── Event Cards ── */}
      <div className="sky-event-list">
        {EVENTS[tab].map((ev, i) => (
          <div key={i} className="sky-event-card">
            <div className="sky-event-top">
              <h3>{ev.name}</h3>
              <span
                className="sky-vis-badge"
                style={{
                  color: VIS_COLOR[ev.visibility],
                  borderColor: VIS_COLOR[ev.visibility] + '40',
                }}
              >
                {ev.visibility}
              </span>
            </div>
            <div className="sky-event-meta">
              <span>📅 {ev.date}</span>
              <span>⏰ {ev.time}</span>
              <span>🧭 {ev.direction}</span>
            </div>
            <p className="sky-event-desc">{ev.description}</p>
          </div>
        ))}
      </div>

      {/* ── Moon & Planet Panel ── */}
      <div className="sky-panels">
        <div className="sky-panel">
          <h3>🌙 Moon Info</h3>
          <div className="sky-panel-row">
            <span>Phase</span>
            <strong>Waxing Crescent</strong>
          </div>
          <div className="sky-panel-row">
            <span>Illumination</span>
            <strong>34%</strong>
          </div>
          <div className="sky-panel-row">
            <span>Moonrise</span>
            <strong>9:02 PM</strong>
          </div>
          <div className="sky-panel-row">
            <span>Moonset</span>
            <strong>8:14 AM</strong>
          </div>
        </div>

        <div className="sky-panel">
          <h3>☀️ Sun & Planets</h3>
          <div className="sky-panel-row">
            <span>Sunrise</span>
            <strong>6:48 AM</strong>
          </div>
          <div className="sky-panel-row">
            <span>Sunset</span>
            <strong>6:22 PM</strong>
          </div>
          <div className="sky-panel-row">
            <span>Jupiter Rise</span>
            <strong>8:15 PM</strong>
          </div>
          <div className="sky-panel-row">
            <span>Saturn Rise</span>
            <strong>5:30 AM</strong>
          </div>
        </div>

        <div className="sky-panel">
          <h3>📊 Viewing Quality</h3>
          <div className="quality-meter">
            <div className="quality-labels">
              <span>Poor</span>
              <span>Moderate</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            <div className="quality-bar">
              <div className="quality-fill" style={{ width: '82%' }} />
              <div className="quality-marker" style={{ left: '82%' }} />
            </div>
          </div>
          <div className="sky-panel-row" style={{ marginTop: '1rem' }}>
            <span>Cloud Cover</span>
            <strong>15%</strong>
          </div>
          <div className="sky-panel-row">
            <span>Moon Brightness</span>
            <strong>Low</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
