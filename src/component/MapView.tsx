"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
const MapView = ({
  destination,
}: {
  destination: { lat: number; long: number };
}) => {
  const { latitude, longitude } = useSelector((state: any) => state.location);
  console.log(destination);
  const userIcon = useMemo(
    () =>
      new Icon({
        iconUrl: "./userlocation.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    []
  );
  const desitnationIcon = useMemo(() => {
    return new Icon({
      iconUrl: "/destinationImage.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  }, []);
  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={12}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "1rem",
          zIndex: 0,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker
          position={[destination.lat, destination.long]}
          icon={desitnationIcon}
        >
          <Popup>📍 Rudradhari Waterfall</Popup>
        </Marker>
        {latitude && longitude && (
          <>
            <Marker position={[latitude, longitude]} icon={userIcon}>
              <Popup>🧍 You are here</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </>
  );
};

export default MapView;
