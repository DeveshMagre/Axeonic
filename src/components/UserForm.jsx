import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { DialogTitle, DialogContent, TextField, Box, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export const UserForm = ({ setOpen }) => {
  const { state, addUser, editUser, dispatch } = useUserContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      if (state.updateUser) {
        await editUser(state.updateUser.id, values);
        dispatch({ type: "SET_UPDATE_USER", payload: null });
      } else {
        await addUser(values);
      }
      formik.resetForm();
      setOpen(false);
    },
  });

  useEffect(() => {
    if (state.updateUser) {
      formik.setValues(state.updateUser);
    }
  }, [state.updateUser]);

  return (
    <>
      <DialogTitle>
        <Typography variant="h6" align="center">
          {state.updateUser ? "Edit User" : "Add User"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />

          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />

          {/* Phone Field */}
          <TextField
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {state.updateUser ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};