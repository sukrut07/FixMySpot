"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import L from "leaflet";
import { AlertTriangle, Layers, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORY_LABELS, DEFAULT_CENTER, ISSUE_CATEGORIES, SEVERITIES, SEVERITY_STYLES, STATUSES, STATUS_STYLES } from "@/lib/constants";
import { useMapStore } from "@/store/map-store";
import type { Issue } from "@/types";

function markerIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div class="marker-pin" style="background:${color}"><span>${label}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -26]
  });
}

export function IssueMap({ issues, full = false }: { issues: Issue[]; full?: boolean }) {
  const { categories, severities, statuses, heatmap, toggleCategory, toggleSeverity, toggleStatus, setHeatmap } = useMapStore();
  const filtered = useMemo(
    () =>
      issues.filter(
        (issue) =>
          (!categories.length || categories.includes(issue.category)) &&
          (!severities.length || severities.includes(issue.severity)) &&
          (!statuses.length || statuses.includes(issue.status))
      ),
    [categories, issues, severities, statuses]
  );

  return (
    <div className={full ? "relative h-[calc(100vh-4rem)]" : "relative h-[420px] overflow-hidden rounded-lg border border-border"}>
      {full && (
        <aside className="absolute left-4 top-4 z-[450] hidden w-80 space-y-4 rounded-lg border border-border bg-card/95 p-4 shadow-2xl lg:block">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Filters</h2>
            <Button size="sm" variant="secondary" onClick={() => setHeatmap(!heatmap)}>
              <Layers size={16} />
              {heatmap ? "Markers" : "Heat"}
            </Button>
          </div>
          <FilterGroup title="Category" options={ISSUE_CATEGORIES} selected={categories} labels={CATEGORY_LABELS} onToggle={toggleCategory} />
          <FilterGroup title="Severity" options={SEVERITIES} selected={severities} labels={severityLabels} onToggle={toggleSeverity} />
          <FilterGroup title="Status" options={STATUSES} selected={statuses} labels={statusLabels} onToggle={toggleStatus} />
        </aside>
      )}
      <MapContainer center={DEFAULT_CENTER} zoom={12} scrollWheelZoom className="z-0">
        <TileLayer attribution="&copy; OpenStreetMap &copy; CARTO" url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <CircleMarker center={DEFAULT_CENTER} radius={9} pathOptions={{ color: "#2F80ED", fillColor: "#2F80ED", fillOpacity: 0.8 }}>
          <Popup>Your approximate area</Popup>
        </CircleMarker>
        {filtered.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.lat, issue.lng]}
            icon={markerIcon(SEVERITY_STYLES[issue.severity].color, CATEGORY_LABELS[issue.category].slice(0, 1))}
          >
            <Popup>
              <div className="w-56 space-y-3">
                <div>
                  <p className="font-semibold text-white">{issue.title}</p>
                  <p className="text-xs text-muted">{issue.address}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={SEVERITY_STYLES[issue.severity].className}>{issue.severity}</Badge>
                  <Badge className={STATUS_STYLES[issue.status].className}>{issue.status.replace("_", " ")}</Badge>
                </div>
                <Link href={`/issues/${issue.id}`} className={buttonClassName({ size: "sm", className: "w-full" })}>
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {full && (
        <>
          <Card className="absolute bottom-5 left-4 z-[450] hidden p-3 sm:block">
            <div className="flex items-center gap-3 text-xs text-muted">
              {SEVERITIES.map((severity) => (
                <span key={severity} className="inline-flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full" style={{ background: SEVERITY_STYLES[severity].color }} />
                  {SEVERITY_STYLES[severity].label}
                </span>
              ))}
            </div>
          </Card>
          <Link href="/report" className={buttonClassName({ size: "lg", className: "absolute bottom-5 right-5 z-[450]" })}>
            <PlusCircle size={19} />
            Report Issue
          </Link>
        </>
      )}
      {!filtered.length && (
        <div className="absolute inset-0 z-[460] grid place-items-center bg-background/75">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-2 text-orange" />
            <p className="font-semibold text-white">No issues match these filters</p>
          </div>
        </div>
      )}
    </div>
  );
}

const severityLabels = Object.fromEntries(SEVERITIES.map((severity) => [severity, SEVERITY_STYLES[severity].label])) as Record<(typeof SEVERITIES)[number], string>;
const statusLabels = Object.fromEntries(STATUSES.map((status) => [status, STATUS_STYLES[status].label])) as Record<(typeof STATUSES)[number], string>;

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  labels,
  onToggle
}: {
  title: string;
  options: T[];
  selected: T[];
  labels: Record<T, string>;
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">{title}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`rounded-md border px-2 py-1.5 text-left text-xs transition ${
              selected.includes(option) ? "border-orange bg-orange/10 text-orange" : "border-border bg-background text-muted hover:text-white"
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
