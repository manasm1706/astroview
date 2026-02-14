import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import Header from '../components/ui/curved-menu'
import Footer from '../components/Footer'
import './LandingPage.css'
import scrollVideo from '../assets/mythical_extraterrestrial_discs_remix.webm'

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // Wait for metadata so we know the duration
    const onLoaded = () => {
      const handleScroll = () => {
        const rect = container.getBoundingClientRect()
        const scrollHeight = container.scrollHeight - window.innerHeight
        const scrollTop = -rect.top
        const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight))
        video.currentTime = progress * video.duration
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      // Set initial frame
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (video.readyState >= 1) {
      const cleanup = onLoaded()
      return cleanup
    }

    let cleanup: (() => void) | undefined
    const handler = () => { cleanup = onLoaded() }
    video.addEventListener('loadedmetadata', handler)
    return () => {
      video.removeEventListener('loadedmetadata', handler)
      cleanup?.()
    }
  }, [])

  return (
    <div className="landing" ref={containerRef}>
      {/* Curved hamburger menu */}
      <Header />

      {/* ───── Scroll-driven video background ───── */}
      <div className="video-bg-wrapper">
        <video
          ref={videoRef}
          src={scrollVideo}
          muted
          playsInline
          preload="auto"
          className="video-bg"
        />
        {/* Edge blur masks for seamless blending */}
        <div className="video-edge-top" />
        <div className="video-edge-bottom" />
        <div className="video-edge-left" />
        <div className="video-edge-right" />
      </div>

      {/* ───── SECTION 1: Intro — Title ───── */}
      <section className="intro">
        <div className="intro-overlay">
          <div className="intro-content">
            <h1 className="intro-title">
              <span className="intro-title-line accent">AstroView</span>
              <span className="intro-subtitle">
                - Your Window to the
                <br />
                Cosmos
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ───── SECTION 2: Hero ───── */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-center" style={{ paddingTop: '4rem' }}>
            <span className="hero-badge">🛰️ Space Intelligence Platform</span>
            <h2 className="hero-heading">
              See Space. <em>Understand Impact.</em>
            </h2>
            <p className="hero-description">
              Real-time celestial events, ISS tracking, sky visibility scores,
              and actionable space insights — all localized to your location and
              simplified for everyone.
            </p>
            <div className="hero-cta">
              <Link to="/dashboard" className="btn-primary">
                Explore Now
              </Link>
              <Link to="/sky-events" className="btn-secondary">
                View Tonight's Sky
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SECTION 3: Features ───── */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">✨ Core Features</span>
          <h2 className="section-title">Everything you need to explore space</h2>
          <p className="section-subtitle">
            From live satellite tracking to personalized sky alerts — AstroView
            brings the cosmos to you.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌠</div>
            <h3>Sky Alerts</h3>
            <p>
              Get notified about meteor showers, eclipses, and other celestial
              events visible from your location.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛰</div>
            <h3>ISS Tracking</h3>
            <p>
              Track the International Space Station in real-time and know
              exactly when it passes above you.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Space Impact</h3>
            <p>
              Understand how solar activity, asteroids, and space weather
              affect daily life on Earth.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Learn Space Simply</h3>
            <p>
              Complex astronomy data translated into clear, beginner-friendly
              insights anyone can understand.
            </p>
          </div>
        </div>
      </section>

      {/* ───── SECTION 4: How It Works ───── */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-badge">⚡ How It Works</span>
          <h2 className="section-title">From data to discovery in seconds</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">📍</div>
            <h3>Detect Location</h3>
            <p>We pinpoint your geographic coordinates to localize all space data.</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">📡</div>
            <h3>Fetch Space Data</h3>
            <p>Live data from NASA, ISS, and weather APIs is aggregated in real-time.</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">🧠</div>
            <h3>Analyze &amp; Simplify</h3>
            <p>Complex metrics are processed into clear visibility scores and alerts.</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">🚀</div>
            <h3>Deliver Insight</h3>
            <p>You get personalized sky info, event notifications, and impact analysis.</p>
          </div>
        </div>
      </section>

      {/* ───── SECTION 5: CTA Banner ───── */}
      <section className="cta-banner">
        <h2>Ready to explore the cosmos?</h2>
        <p>Your personalized space intelligence dashboard is one click away.</p>
        <Link to="/dashboard" className="btn-primary btn-lg">
          Launch Dashboard →
        </Link>
      </section>

      {/* ───── Footer ───── */}
      <Footer />
    </div>
  )
}
