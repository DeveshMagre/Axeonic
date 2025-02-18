import { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import { Search } from "../components/Search";
import { ThemeToggle } from "../components/ThemeToggle";
import { Pagination, Button, Dialog, Box, Grid } from "@mui/material";

export const UsersPage = () => {
  const { state, fetchUsers, removeUser, dispatch } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortedData = state.users.sort((a, b) => a.name.localeCompare(b.name));
  const filteredData = sortedData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={1} alignItems="center" justifyContent="space-around">
        <Grid item>
          <Search onSearch={setSearchTerm} />
        </Grid>
        
        <Grid item>
          <Button
            variant="contained"
            style={{ width: "300px" }}
            onClick={() => setOpen(true)}
          >
            Add User
          </Button>
        </Grid>
        <Grid item>
          <ThemeToggle />
        </Grid>
      </Grid>

      <UserTable
        users={paginatedData}
        onEdit={(user) => {
          dispatch({ type: "SET_UPDATE_USER", payload: user });
          setOpen(true);
        }}
        onDelete={removeUser}
        onView={(user) => navigate(`/user/${user.id}`, { state: { user } })}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <UserForm setOpen={setOpen} />
      </Dialog>
    </Box>
  );
};