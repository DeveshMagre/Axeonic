import { createContext, useReducer, useContext } from "react";
import { getUsers, postData, updateData, deleteUser } from "../services/PostApi";

const UserContext = createContext();

const initialState = {
  users: [],
  updateUser: null, 
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "SET_UPDATE_USER":
      return { ...state, updateUser: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      dispatch({ type: "SET_USERS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const addUser = async (user) => {
    try {
      const res = await postData(user);
      if (res.status === 201) {
        dispatch({ type: "ADD_USER", payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (id, user) => {
    try {
      const res = await updateData(id, user);
      if (res.status === 200) {
        dispatch({ type: "UPDATE_USER", payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.status === 200) {
        dispatch({ type: "DELETE_USER", payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, fetchUsers, addUser, editUser, removeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
