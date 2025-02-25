import { useEffect, useState } from "react";
import "./App.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    axios.get<City[]>("https://localhost:5001/api/cities")
      .then((response) => setCities(response.data))

    return () => {}
  }, []);

  return (
    <>
      <Typography variant="h3">CityTravel</Typography>
      <List>
        {cities.map((city) => (
          <ListItem key={city.id}>
            <ListItemText>{city.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
