import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './LiveTracker.css'

interface IssPosition {
  latitude: number
  longitude: number
}

export default function LiveTracker() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMap = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const pathRef = useRef<L.Polyline | null>(null)
  const [pos, setPos] = useState<IssPosition>({ latitude: 0, longitude: 0 })
  const [lastUpdate, setLastUpdate] = useState('')
  const pathPoints = useRef<[number, number][]>([])

  const issIcon = L.divIcon({
    className: 'iss-marker',
    html: '<div class="iss-dot"><span>🛰️</span></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  const fetchISS = async () => {
    try {
      const res = await fetch('http://api.open-notify.org/iss-now.json')
      const data = await res.json()
      const lat = parseFloat(data.iss_position.latitude)
      const lng = parseFloat(data.iss_position.longitude)
      setPos({ latitude: lat, longitude: lng })
      setLastUpdate(new Date().toLocaleTimeString())

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      }

      pathPoints.current.push([lat, lng])
      if (pathPoints.current.length > 200) pathPoints.current.shift()
      if (pathRef.current) {
        pathRef.current.setLatLngs(pathPoints.current)
      }

      if (leafletMap.current) {
        leafletMap.current.panTo([lat, lng], { animate: true, duration: 1 })
      }
    } catch {
      // silently fail
    }
  }

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return

    const map = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 18 }
    ).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const marker = L.marker([0, 0], { icon: issIcon }).addTo(map)
    markerRef.current = marker

    const path = L.polyline([], {
      color: '#00F5FF',
      weight: 2,
      opacity: 0.5,
      dashArray: '6 4',
    }).addTo(map)
    pathRef.current = path

    leafletMap.current = map

    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => {
      clearInterval(interval)
      map.remove()
      leafletMap.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const speed = 27580 // ISS average speed km/h
  const altitude = 420  // ISS average altitude km

  return (
    <div className="live-tracker">
      {/* Map */}
      <div ref={mapRef} className="tracker-map" />

      {/* Info Panel */}
      <div className="tracker-panel">
        <h2>🛰️ ISS Live Tracker</h2>
        <div className="tracker-row">
          <span>Latitude</span>
          <strong>{pos.latitude.toFixed(4)}°</strong>
        </div>
        <div className="tracker-row">
          <span>Longitude</span>
          <strong>{pos.longitude.toFixed(4)}°</strong>
        </div>
        <div className="tracker-row">
          <span>Speed</span>
          <strong>{speed.toLocaleString()} km/h</strong>
        </div>
        <div className="tracker-row">
          <span>Altitude</span>
          <strong>{altitude} km</strong>
        </div>
        <div className="tracker-row">
          <span>Last Update</span>
          <strong>{lastUpdate || '—'}</strong>
        </div>
        <div className="tracker-refresh-note">
          <span className="tracker-live-dot" /> Auto-refreshing every 5s
        </div>
      </div>
    </div>
  )
}
