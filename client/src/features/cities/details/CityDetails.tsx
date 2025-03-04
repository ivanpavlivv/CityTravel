import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router";
import { useCities } from "../../../lib/hooks/useCities";

export default function CityDetails() {
  const { id } = useParams();
  const { city, isLoadingCity } = useCities(id);

  if (!city || isLoadingCity) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Grid2 container>
          <Grid2 size={5}>
            <Box>
              <Typography variant="h5">City: {city.name}</Typography>
              <Typography>Description: {city.description}</Typography>
              <Typography>Longitude: {city.latitude}</Typography>
              <Typography>Latitude: {city.longitude}</Typography>
              <Typography>Create Date: {city.createDate}</Typography>
              <Typography>Update Date: {city.updateDate}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={7}>
            {city.details ? (
              <Box bgcolor={"#e8f5e9"} borderRadius={2}>
                <Typography variant="h5">Cost of living</Typography>
                <Typography>Cost of Food: {city.details.costOfFood}</Typography>
                <Typography>Taxi cost: {city.details.taxiCost}</Typography>
                <Typography>
                  Apartment cost: {city.details.apartmentCost}
                </Typography>
                <Typography>Rent cost: {city.details.rentCost}</Typography>
                <Typography>Create Date: {city.details.createDate}</Typography>
                <Typography>Update Date: {city.details.updateDate}</Typography>
              </Box>
            ) : (
              <Typography>No Details provided</Typography>
            )}
          </Grid2>
        </Grid2>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/manage/${city.id}`} color="primary">
          Edit
        </Button>
        <Button component={Link} to={`/cities`} color="primary">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
