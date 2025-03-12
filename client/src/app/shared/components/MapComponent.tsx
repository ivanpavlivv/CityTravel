import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
    position: [number, number];
    markerName?: string;
}

export default function MapComponent({position, markerName}: Props) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", borderRadius: 2}}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          {markerName ? markerName : position}
        </Popup>
      </Marker>
    </MapContainer>
  );
}