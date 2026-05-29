"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type TerritoryMapPoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  category: string;
};

type TerritoryMapProps = {
  points: TerritoryMapPoint[];
  visibleIds: ReadonlySet<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const MAP_CENTER: [number, number] = [-30.62, -71.38];
const DEFAULT_ZOOM = 10;
const MAX_BOUNDS = L.latLngBounds([-30.88, -71.88], [-30.4, -71.02]);

function createMarkerIcon(color: string, active: boolean, visible: boolean) {
  const size = active ? 30 : 24;

  return L.divIcon({
    className: "territory-map-marker",
    html: `
      <div class="territory-marker ${active ? "territory-marker--active" : ""} ${visible ? "" : "territory-marker--dim"}" style="--marker-color:${color}">
        ${active ? '<span class="territory-marker__pulse"></span>' : ""}
        <span class="territory-marker__core"></span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function MapController({
  selectedId,
  points,
  visibleIds,
}: {
  selectedId: string | null;
  points: TerritoryMapPoint[];
  visibleIds: ReadonlySet<string>;
}) {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(MAX_BOUNDS);
    map.setMinZoom(9);
  }, [map]);

  useEffect(() => {
    const visible = points.filter((p) => visibleIds.has(p.id));
    if (visible.length === 0) return;

    if (selectedId) {
      const selected = visible.find((p) => p.id === selectedId);
      if (selected) {
        map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 11), {
          duration: 1.1,
          easeLinearity: 0.22,
        });
        return;
      }
    }

    const bounds = L.latLngBounds(visible.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds.pad(0.18), { animate: true, duration: 0.8, maxZoom: 11 });
  }, [map, points, selectedId, visibleIds]);

  return null;
}

export function TerritoryMap({
  points,
  visibleIds,
  selectedId,
  onSelect,
}: TerritoryMapProps) {
  const markers = useMemo(
    () =>
      points.map((point) => ({
        ...point,
        visible: visibleIds.has(point.id),
        active: selectedId === point.id,
        icon: createMarkerIcon(point.color, selectedId === point.id, visibleIds.has(point.id)),
      })),
    [points, selectedId, visibleIds]
  );

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      zoomControl={false}
      className="territory-map-container h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        maxZoom={18}
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        attribution=""
        maxZoom={18}
        opacity={0.72}
      />
      <ZoomControl position="bottomright" />
      <MapController selectedId={selectedId} points={points} visibleIds={visibleIds} />

      {markers.map((point) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={point.icon}
          opacity={point.visible ? 1 : 0.35}
          zIndexOffset={point.active ? 1000 : point.visible ? 100 : 0}
          eventHandlers={{
            click: () => onSelect(point.id),
          }}
        />
      ))}
    </MapContainer>
  );
}
