import { LocationCity } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { formatDistance } from "date-fns";

type Props = {
  city: City;
};

export default function CityCard({ city }: Props) {
  return (
    <Card>
      <CardContent>
        <Box key={city.id} display="flex" gap={1} mb={2}>
          <LocationCity fontSize="large" />
          <Typography fontWeight="bold" variant="h4">
            {city.name}
          </Typography>
        </Box>
        <Typography>{city.description}</Typography>
        <Typography>
          {formatDistance(city.createDate, new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip label={city.latitude} variant="outlined" />
        <Chip label={city.longitude} variant="outlined" />
        <Box display="flex" gap={3}>
          <Button component={Link} to={`/cities/${city.id}`}>
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
