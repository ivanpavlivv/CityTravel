import { Grid2 } from "@mui/material";
import CityList from "./CityList";

export default function CityDashboard() {
  return (
    <Grid2 container>
      <Grid2 size={7}>
        <CityList />
      </Grid2>
      <Grid2 size={5}>Something</Grid2>
    </Grid2>
  );
}
