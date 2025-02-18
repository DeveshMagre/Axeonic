import { Typography } from "@mui/material";

export const CompanyInfo = ({ company }) => (
  <>
    <Typography variant="h5" gutterBottom>
      Company Details
    </Typography>
    <Typography variant="body1">
      <strong>Company Name:</strong> {company.name}
    </Typography>
    <Typography variant="body1">
      <strong>Catchphrase:</strong> {company.catchPhrase}
    </Typography>
    <Typography variant="body1">
      <strong>Business:</strong> {company.bs}
    </Typography>
  </>
);