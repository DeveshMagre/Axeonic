import { Typography } from "@mui/material";

export const AddressInfo = ({ address }) => (
  <>
    <Typography variant="h5" gutterBottom>
      Address
    </Typography>
    <Typography variant="body1">
      <strong>Street:</strong> {address.street}
    </Typography>
    <Typography variant="body1">
      <strong>Suite:</strong> {address.suite}
    </Typography>
    <Typography variant="body1">
      <strong>City:</strong> {address.city}
    </Typography>
    <Typography variant="body1">
      <strong>Zipcode:</strong> {address.zipcode}
    </Typography>
    {address.geo && (
      <Typography variant="body1">
        <strong>Coordinates:</strong> Lat {address.geo.lat}, Lng {address.geo.lng}
      </Typography>
    )}
  </>
);