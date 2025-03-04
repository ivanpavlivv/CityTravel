import { TravelExplore } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  MenuItem,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <TravelExplore fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  City Travel
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{display: "flex"}}>
              <MenuItemLink to="/cities">Cities</MenuItemLink>
              <MenuItemLink to="/createCity">Create City</MenuItemLink>
            </Box>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
