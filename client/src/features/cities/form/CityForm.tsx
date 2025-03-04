import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useCities } from "../../../lib/hooks/useCities";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCitiesDetails } from "../../../lib/hooks/useCitiesDetails";

export default function CityForm() {
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const { updateCity, createCity, city, isLoadingCity } = useCities(id);
  const { createCityDetails, updateCityDetails } = useCitiesDetails(
    city?.details?.id
  );
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (city) {
      await updateCity.mutateAsync(data as unknown as City);

      if (checked) {
        data.cityId = city.id;
        if (city.details) {
          await updateCityDetails.mutateAsync(data as unknown as Details);
        } else {
          await createCityDetails.mutateAsync(data as unknown as Details);
        }
      }

      navigate(`/cities/${city.id}`);
    } else {
      createCity.mutate(data as unknown as City, {
        onSuccess: (id) => {
          if (checked) {
            data.cityId = id;
            createCityDetails.mutate(data as unknown as Details);
          }
          navigate(`/cities/${id}`);
        },
      });
    }
  };

  if (isLoadingCity) return <Typography>Loading City...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {city ? "Edit city" : "Create city"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="name" label="Name" defaultValue={city?.name} />
        <TextField
          name="description"
          label="Description"
          defaultValue={city?.description}
          multiline
          rows={3}
        />
        <TextField
          name="latitude"
          label="Latitude"
          defaultValue={city?.latitude}
        />
        <TextField
          name="longitude"
          label="Longitude"
          defaultValue={city?.longitude}
        />
        <Box bgcolor={"#e8f5e9"} borderRadius={2}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Details"
          />
        </Box>
        {checked && (
          <>
            <TextField
              name="costOfFood"
              label="Cost of Food"
              defaultValue={city?.details?.costOfFood}
            />
            <TextField
              name="taxiCost"
              label="Taxi Cost"
              defaultValue={city?.details?.taxiCost}
              multiline
              rows={3}
            />
            <TextField
              name="apartmentCost"
              label="Apartment Cost"
              defaultValue={city?.details?.apartmentCost}
            />
            <TextField
              name="rentCost"
              label="Rent Cost"
              defaultValue={city?.details?.rentCost}
            />
          </>
        )}

        <Box display="flex" justifyContent="end" gap={3}>
          <Button component={Link} to={`/cities`} color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateCity.isPending || createCity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
