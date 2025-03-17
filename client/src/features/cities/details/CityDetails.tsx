import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useCities } from "../../../lib/hooks/useCities";
import DialogButton from "../../../app/shared/components/DialogButton";
import { useCitiesDetails } from "../../../lib/hooks/useCitiesDetails";
import { formatDate } from "../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

export default function CityDetails() {
  const { id } = useParams();
  const { city, deleteCity, isLoadingCity } = useCities(id);
  const { deleteCityDetails } = useCitiesDetails(city?.details?.id);
  const navigate = useNavigate();
  const [mapOpen, setMapOpen] = useState(false);

  if (!city || isLoadingCity) return <Typography>Loading...</Typography>;

  const handleDeleteCity = () => {
    deleteCity.mutate();
    navigate("/cities");
  };

  const handleDeleteCityDetails = () => {
    deleteCityDetails.mutate();
    navigate("/cities");
  };

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
              <Typography>
                Create Date: {formatDate(city.createDate)}
              </Typography>
              <Typography>
                Update Date: {formatDate(city.updateDate)}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={7}>
            {city.details ? (
              <Box bgcolor={"#e8f5e9"} borderRadius={2}>
                <Box mx={2}>
                  <Typography variant="h5">
                    Average cost of living in {city.name}
                  </Typography>
                  <Typography>
                    Meal, inexpensive restaurant: {city.details.costOfFood}$
                  </Typography>
                  <Typography>
                    Taxi cost (1 km): {city.details.taxiCost}$
                  </Typography>
                  <Typography>
                    Apartment cost in city center (1 square meter):{" "}
                    {city.details.apartmentCost}$
                  </Typography>
                  <Typography>
                    Rent cost in city center (1 month): {city.details.rentCost}$
                  </Typography>
                  <Typography>
                    Create Date: {formatDate(city.details.createDate)}
                  </Typography>
                  <Typography>
                    Update Date: {formatDate(city.details.updateDate)}
                  </Typography>
                  <DialogButton
                    title={`Remove details for city ${city.name}`}
                    label={`Are you sure you want to remove details for city ${city.name}?`}
                    handleProceed={handleDeleteCityDetails}
                    color="error"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Delete Details
                  </DialogButton>
                </Box>
              </Box>
            ) : (
              <Typography>No Details provided</Typography>
            )}
          </Grid2>
        </Grid2>
        {mapOpen && (
          <Box sx={{ height: 400, zIndex: 1000, display: "block", mt: 3 }}>
            <MapComponent
              position={[city.latitude, city.longitude]}
              markerName={city.name}
            />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button onClick={() => setMapOpen(!mapOpen)}>
            {mapOpen ? "Hide map" : "Show map"}
          </Button>
          <Button component={Link} to={`/manage/${city.id}`} color="primary">
            Edit
          </Button>
          <Button component={Link} to={`/cities`} color="primary">
            Cancel
          </Button>
        </Box>
        <DialogButton
          title={`Remove city ${city.name}`}
          label={`Are you sure you want to remove city ${city.name}?`}
          handleProceed={handleDeleteCity}
          color="error"
          variant="contained"
        >
          Delete
        </DialogButton>
      </CardActions>
    </Card>
  );
}
