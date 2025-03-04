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

type Props = {
  city: City;
};

export default function CityCard({ city }: Props) {
  return (
    <Card>
      <CardContent>
        <Box key={city.id} display="flex" gap={1}>
          <LocationCity fontSize="small" />
          <Typography>{city.name}</Typography>
        </Box>
        <Typography>{city.description}</Typography>
        <Typography>{city.createDate}</Typography>
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
