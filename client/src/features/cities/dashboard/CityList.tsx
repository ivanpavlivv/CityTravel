import { Typography } from "@mui/material";
import Masonry from "react-masonry-css";
import CityCard from "./CityCard";
import { useCities } from "../../../lib/hooks/useCities";

export default function CityList() {
  const { cities, isPending } = useCities();

  const breakpointColumns = {
    default: 4, // 4 columns for large screens
    1100: 3, // 3 columns for medium screens
    768: 2, // 2 columns for tablets
    500: 1, // 1 column for mobile screens
  };

  return (
    <>
      {!cities || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </Masonry>
      )}
    </>
  );
}
