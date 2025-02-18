import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserTable = ({ users, onEdit, onDelete, onView }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleClickOpen = (user) => {
    setUserToDelete(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
    }
    handleClose();
  };


  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            '& th': { color: theme.palette.text.primary }
          }}>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                backgroundColor: index % 2 === 0 ?
                  theme.palette.background.default :
                  theme.palette.action.hover
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div style={{
                  display: 'flex',
                  gap: theme.spacing(1),
                  width: '100%',
                }}>
                  <Button
                    onClick={() => onEdit(user)}
                    variant="contained"
                    sx={{
                      flex: 1,
                      backgroundColor: 'green',
                      color: 'white',
                      minWidth: '120px',
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleClickOpen(user)} // Open dialog on delete click
                    variant="contained"
                    sx={{
                      flex: 1,
                      backgroundColor: 'red',
                      color: 'white',
                      minWidth: '120px',
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => onView(user)}
                    variant="contained"
                    sx={{
                      flex: 1,
                      backgroundColor: 'blue',
                      color: 'white',
                      minWidth: '120px',
                    }}
                  >
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {userToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};