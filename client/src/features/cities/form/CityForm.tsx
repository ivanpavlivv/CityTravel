import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useCities } from "../../../lib/hooks/useCities";
import { ChangeEvent, useEffect, useState } from "react";
import { useCitiesDetails } from "../../../lib/hooks/useCitiesDetails";
import { useForm } from "react-hook-form";
import { citySchema, CitySchema } from "../../../lib/schemas/citySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import LocationMap from "../../../app/shared/components/LocationMap";
import { City, Details, LocationIQSuggestion } from "../../../lib/types";
import CityDetailsInputs from "./CityDetailsInputs";

export default function CityForm() {
  const { reset, control, handleSubmit, resetField, getValues } =
    useForm<CitySchema>({
      mode: "onTouched",
      resolver: zodResolver(citySchema),
    });
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const { updateCity, createCity, city, isLoadingCity } = useCities(id);
  const { createCityDetails, updateCityDetails } = useCitiesDetails(
    city?.details?.id
  );
  const [suggestion, setSuggestion] = useState<LocationIQSuggestion | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (city) reset(city);
  }, [city, reset]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      resetField("details");
    }
  };

  const onSubmit = async (data: CitySchema) => {
    const flattenedDetails = data.details as Details;
    try {
      if (city) {
        updateCity.mutate(data as City);
        flattenedDetails.cityId = city.id;
        if (checked) {
          if (city.details) {
            await updateCityDetails.mutateAsync(flattenedDetails);
          } else {
            await createCityDetails.mutateAsync(flattenedDetails);
          }
        }
        navigate(`/cities/${city.id}`);
      } else {
        createCity.mutate(data as City, {
          onSuccess: (id) => {
            if (checked) {
              flattenedDetails.cityId = id;
              createCityDetails.mutate(flattenedDetails);
            }
            navigate(`/cities/${id}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingCity) return <Typography>Loading City...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {city ? "Edit City" : "Create City"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextInput
          label="City Name"
          control={control}
          name="name"
          autoValue={suggestion?.address.city}
        />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={3}
        />
        <Box bgcolor={"#e8f5e9"} borderRadius={2}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Details"
          />
        </Box>

        {checked && (
          <CityDetailsInputs
            control={control}
            cityName={getValues("name")}
          ></CityDetailsInputs>
        )}
        <Box bgcolor={"#e8f5e9"} borderRadius={2}>
          <LocationMap setSuggestion={setSuggestion}></LocationMap>
        </Box>

        <TextInput
          label="Latitude"
          control={control}
          name="latitude"
          autoValue={suggestion?.lat ? +suggestion.lat : undefined}
        />
        <TextInput
          label="Longitude"
          control={control}
          name="longitude"
          autoValue={suggestion?.lon ? +suggestion.lon : undefined}
        />

        <Box display="flex" justifyContent="end" gap={3}>
          <Button component={Link} to={`/cities`} color="inherit">
            Cancel
          </Button>
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
