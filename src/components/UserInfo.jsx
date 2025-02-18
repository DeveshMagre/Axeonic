import { Typography, Link } from "@mui/material";

export const UserInfo = ({ user }) => (
  <>
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
  </>
);