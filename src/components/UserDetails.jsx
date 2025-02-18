import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Grid, Link, Paper } from "@mui/material";

export const UserDetails = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Website:</strong>{" "}
              <Link href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </Link>
            </Typography>
          </Grid>

          {user.address && (
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1">
                <strong>Street:</strong> {user.address.street}
              </Typography>
              <Typography variant="body1">
                <strong>Suite:</strong> {user.address.suite}
              </Typography>
              <Typography variant="body1">
                <strong>City:</strong> {user.address.city}
              </Typography>
              <Typography variant="body1">
                <strong>Zipcode:</strong> {user.address.zipcode}
              </Typography>
              {user.address.geo && (
                <Typography variant="body1">
                  <strong>Coordinates:</strong> Lat {user.address.geo.lat}, Lng {user.address.geo.lng}
                </Typography>
              )}
            </Grid>
          )}

          {user.company && (
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Company Details
              </Typography>
              <Typography variant="body1">
                <strong>Company Name:</strong> {user.company.name}
              </Typography>
              <Typography variant="body1">
                <strong>Catchphrase:</strong> {user.company.catchPhrase}
              </Typography>
              <Typography variant="body1">
                <strong>Business:</strong> {user.company.bs}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};