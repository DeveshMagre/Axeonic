import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const handleError = (error) => {
  if (error.response) {
    console.error("Server Error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No Response Received:", error.request);
  } else {
    console.error("Request Setup Error:", error.message);
  }
};

export const getUsers = () => {
  return api.get("/users").catch((error) => {
    handleError(error);
    throw error; 
  });
};
export const deleteUser = (id) => {
  return api.delete(`/users/${id}`).catch((error) => {
    handleError(error);
    throw error;
  });
};

export const postData = (user) => {
  return api.post("/users", user).catch((error) => {
    handleError(error);
    throw error;
  });
};

export const updateData = (id, user) => {
  return api.put(`/users/${id}`, user).catch((error) => {
    handleError(error);
    throw error;
  });
};