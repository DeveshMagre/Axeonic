import { useLocation } from "react-router-dom";
import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { UserInfo } from "../components/UserInfo";
import { AddressInfo } from "../components/AddressInfo";
import { CompanyInfo } from "../components/CompanyInfo";

export const UserDetailPage = () => {
  const location = useLocation();
  const user = location.state?.user;
  const theme = useTheme();

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ 
        p: 3,
        backgroundColor: theme.palette.background.paper
      }}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          User Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserInfo user={user} />
          </Grid>
          {user.address && (
            <Grid item xs={12} md={6}>
              <AddressInfo address={user.address} />
            </Grid>
          )}
          {user.company && (
            <Grid item xs={12}>
              <CompanyInfo company={user.company} />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};