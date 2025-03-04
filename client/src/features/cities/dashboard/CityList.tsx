import { Box, Typography } from "@mui/material";
import CityCard from "./CityCard";
import { useCities } from "../../../lib/hooks/useCities";

export default function CityList() {
  const { cities, isPending } = useCities();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {!cities || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        cities.map((city) => <CityCard key={city.id} city={city}></CityCard>)
      )}
    </Box>
  );
}
