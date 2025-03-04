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

export default function CityDetails() {
  const { id } = useParams();
  const { city, deleteCity, isLoadingCity } = useCities(id);
  const { deleteCityDetails } = useCitiesDetails(city?.details?.id);
  const navigate = useNavigate();

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
                  <Typography variant="h5">Cost of living</Typography>
                  <Typography>
                    Cost of Food: {city.details.costOfFood}
                  </Typography>
                  <Typography>Taxi cost: {city.details.taxiCost}</Typography>
                  <Typography>
                    Apartment cost: {city.details.apartmentCost}
                  </Typography>
                  <Typography>Rent cost: {city.details.rentCost}</Typography>
                  <Typography>
                    Create Date:{" "}
                    {formatDate(city.details.createDate)}
                  </Typography>
                  <Typography>
                    Update Date:{" "}
                    {formatDate(city.details.updateDate)}
                  </Typography>
                  <DialogButton
                    title={`Remove details for city ${city.name}`}
                    label={`Are you sure you want to remove details for city ${city.name}?`}
                    handleProceed={handleDeleteCityDetails}
                    color="error"
                    variant="contained"
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
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
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
