"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Circle, GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const STORAGE_KEY = "fixmyspot-community-issues";
const DEFAULT_CENTER = { lat: 18.5204, lng: 73.8567 };
const GOOGLE_MAP_LIBRARIES = ["places"];

const categories = ["All", "Road Issue", "Water/Power", "Safety", "Lost & Found", "Event"];

const categoryColors = {
  "Road Issue": "#ef4444",
  "Water/Power": "#facc15",
  Safety: "#9333ea",
  "Lost & Found": "#22c55e",
  Event: "#3b82f6"
};

const mapContainerStyle = {
  width: "100%",
  height: "620px"
};

const mapOptions = {
  disableDefaultUI: false,
  clickableIcons: false,
  fullscreenControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#f8fafc" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#111827" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#4c1d95" }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#202040" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#24244a" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#18382f" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#31245a" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#43306f" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#4c1d95" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2d2d52" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#101827" }] }
  ]
};

function getPinIcon(color) {
  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 1.5,
    scale: 1.65,
    anchor: { x: 12, y: 22 }
  };
}

function formatIssueTime(isoTime) {
  const date = new Date(isoTime);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default function CommunityMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
  const [locationStatus, setLocationStatus] = useState("Finding your live location...");
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [draftPosition, setDraftPosition] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Road Issue",
    description: ""
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries: GOOGLE_MAP_LIBRARIES
  });

  useEffect(() => {
    const savedIssues = window.localStorage.getItem(STORAGE_KEY);
    if (savedIssues) {
      try {
        setIssues(JSON.parse(savedIssues));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is unavailable. Showing Pune for now.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus("Showing reports within 10 km of your live location.");
      },
      () => {
        setLocationStatus("Could not access location. Showing Pune for now.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const visibleIssues = useMemo(() => {
    if (filter === "All") return issues;
    return issues.filter((issue) => issue.category === filter);
  }, [filter, issues]);

  const handleMapClick = useCallback((event) => {
    if (!event.latLng) return;
    setSelectedIssue(null);
    setDraftPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draftPosition || !form.title.trim() || !form.description.trim()) return;

    const nextIssue = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      position: draftPosition,
      author: "Neighbor",
      createdAt: new Date().toISOString(),
      upvotes: 0
    };

    const nextIssues = [nextIssue, ...issues];
    setIssues(nextIssues);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIssues));
    // Replace this localStorage write with a real POST /api/issues call when backend persistence is ready.

    setForm({ title: "", category: "Road Issue", description: "" });
    setDraftPosition(null);
    setSelectedIssue(nextIssue);
  };

  if (!apiKey) {
    return (
      <section id="location-map" className="community-map-section">
        <div className="community-map-shell">
          <p className="community-map-kicker">Community map</p>
          <h2>Google Maps key missing.</h2>
          <p>Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to .env.local and restart the dev server.</p>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section id="location-map" className="community-map-section">
        <div className="community-map-shell">
          <p className="community-map-kicker">Community map</p>
          <h2>Could not load Google Maps.</h2>
          <p>Check that Maps JavaScript API is enabled for this key.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="location-map" className="community-map-section">
      <div className="community-map-shell">
        <div className="community-map-header">
          <div>
            <p className="community-map-kicker">Live community map</p>
            <h2>Your reports. Your radius. Your block.</h2>
            <p>{locationStatus}</p>
          </div>
          <div className="community-map-radius-pill">10 km radius</div>
        </div>

        <div className="community-map-filters" aria-label="Filter issue pins">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
            >
              {category !== "All" && <span style={{ backgroundColor: categoryColors[category] }} />}
              {category}
            </button>
          ))}
        </div>

        <div className="community-map-card">
          {!isLoaded ? (
            <div className="community-map-loading">Loading your neighborhood map...</div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={userLocation}
              zoom={13}
              options={mapOptions}
              onClick={handleMapClick}
            >
              <MarkerF position={userLocation} title="You are here" icon={getPinIcon("#9333ea")} />
              <Circle
                center={userLocation}
                radius={10000}
                options={{
                  strokeColor: "#9333ea",
                  strokeOpacity: 0.9,
                  strokeWeight: 2,
                  fillColor: "#9333ea",
                  fillOpacity: 0.12
                }}
              />

              {visibleIssues.map((issue) => (
                <MarkerF
                  key={issue.id}
                  position={issue.position}
                  title={issue.title}
                  icon={getPinIcon(categoryColors[issue.category])}
                  onClick={() => {
                    setDraftPosition(null);
                    setSelectedIssue(issue);
                  }}
                />
              ))}

              {draftPosition && (
                <InfoWindow position={draftPosition} onCloseClick={() => setDraftPosition(null)}>
                  <form className="community-map-form" onSubmit={handleSubmit}>
                    <h3>Post a local issue</h3>
                    <label>
                      Title
                      <input
                        value={form.title}
                        onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                        placeholder="Broken streetlight on 5th Cross"
                      />
                    </label>
                    <label>
                      Category
                      <select
                        value={form.category}
                        onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Description
                      <textarea
                        value={form.description}
                        onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                        placeholder="Add the details neighbors should know."
                      />
                    </label>
                    <button type="submit">Post Issue</button>
                  </form>
                </InfoWindow>
              )}

              {selectedIssue && (
                <InfoWindow position={selectedIssue.position} onCloseClick={() => setSelectedIssue(null)}>
                  <article className="community-map-info">
                    <span style={{ backgroundColor: categoryColors[selectedIssue.category] }}>{selectedIssue.category}</span>
                    <h3>{selectedIssue.title}</h3>
                    <p>{selectedIssue.description}</p>
                    <dl>
                      <div><dt>Author</dt><dd>{selectedIssue.author}</dd></div>
                      <div><dt>Time</dt><dd>{formatIssueTime(selectedIssue.createdAt)}</dd></div>
                      <div><dt>Upvotes</dt><dd>{selectedIssue.upvotes}</dd></div>
                    </dl>
                  </article>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  );
}
