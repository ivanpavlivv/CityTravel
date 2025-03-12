import { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LocationIQSuggestion } from "../../../lib/types";
import axios from "axios";

type Props = {
  setSuggestion: React.Dispatch<
    React.SetStateAction<LocationIQSuggestion | null | undefined>
  >;
};

export default function LocationMap({ setSuggestion }: Props) {
  const locationUrl =
    "https://us1.locationiq.com/v1/reverse?key=pk.c2a2d3fb9a8d5db9218910192c437ecd&format=json&";

  const [position, setPosition] = useState<L.LatLng | null>(null);

  const normalizeLongitude = (lng: number) => {
    return ((((lng + 180) % 360) + 360) % 360) - 180;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        e.latlng.lng = normalizeLongitude(e.latlng.lng);
        setPosition(e.latlng);
      },
    });
    return null;
  };

  const fetchSuggestions = useCallback(
    async (lat: number, lng: number) => {
      if (!lat || !lng) {
        setSuggestion(null);
        return;
      }

      try {
        const res = await axios.get<LocationIQSuggestion>(
          `${locationUrl}lat=${lat}&lon=${lng}`
        );
        setSuggestion(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    [setSuggestion, locationUrl]
  );

  useEffect(() => {
    if (position) {
      fetchSuggestions(position.lat, position.lng);
    }
  }, [fetchSuggestions, position]);

  return (
    <MapContainer
      center={[49.8397, 24.0297]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "500px", borderRadius: 2 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {position && <Marker position={position} />}
    </MapContainer>
  );
}
