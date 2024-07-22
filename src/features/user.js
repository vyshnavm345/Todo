import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"
import { clearTasks } from "./tasks";

const API_URL = "http://127.0.0.1";

const initialState = {
  isAuthenticated: false,
  user: null,
  registered: false,
  loading: false,
  error: null,
};


export const register = createAsyncThunk(
    "user/register",
    async ({ fullname, email, password }, thunkAPI) => {
        console.log("register dispatched");
        const body = JSON.stringify({
        name: fullname,
        email,
        password,
        });
        console.log("the body: ", body);
        try {
        const res = await fetch(`${API_URL}/api/register/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        });

        const data = await res.json();
        console.log("received data", data)

        if (res.status === 201) {
            return data;
        } else {
            console.log("received error", data);
            return thunkAPI.rejectWithValue(data);
        }
        } catch (err) {
        console.log("received error in catch", err);
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    console.log("dispatching get user");
    const access = Cookies.get("accessToken")
    const response = await axios.get(`${API_URL}/api/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
        console.log("response data: ", response.data);
        return response.data;
    } else if (response.status === 403) {
        console.log("the response is : ", response.data);
    } else {
        return thunkAPI.rejectWithValue(response.data);
    }
    } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
    }
});



export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
        email,
        password,
        });
        try {
            console.log("dispatching login")
            console.log("body : ", body)
        const res = await fetch(`${API_URL}/api/token/`, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body,
        });

        const data = await res.json();
        console.log("data: ", data);

        if (res.status === 200) {
            Cookies.set("accessToken", data.access, { expires: 7 });
            Cookies.set("refreshToken", data.refresh, { expires: 7 });

            const { dispatch } = thunkAPI;

            dispatch(getUser());

            return data;
        } else if (res.status === 403) {
            console.log("the response is : ", res.data.error);
        } else {
            return thunkAPI.rejectWithValue(data);
        }
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(resetUser());
    dispatch(clearTasks());

});


export const checkAuth = createAsyncThunk(
    "users/verify",
    async (_, thunkAPI) => {
        try {
            console.log("checking user")
        const accessToken = Cookies.get("accessToken"); 
        const response = await axios.post(`${API_URL}/api/token/verify/`, {
          token: accessToken,
        });

        if (response.status === 200) {
            const { dispatch } = thunkAPI;

            console.log("dispatching get user")
            dispatch(getUser());
            console.log("The data is ", response.data)
            
            return response.data;
        } else {
            console.log("The error  is ", response.data)
            return thunkAPI.rejectWithValue(response.data);
        }
    } catch (err) {
            console.log("The err is ", err)
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetRegistered: (state) => {
        console.log("resetRegistered")
        state.registered = false;
        },
        resetUser: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        console.log("the user has been reset")
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            console.log("registerd was : ", state.registered);
            state.registered = true;
            console.log("now registerd is : ", state.registered);
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log("the user was ", state.user);
            state.user = action.payload;
            console.log("Now the user is ", state.user);
          })
          .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
          })
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(checkAuth.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkAuth.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true;
          })
          .addCase(checkAuth.rejected, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
          });
    },
});

export const { resetRegistered, resetUser } = userSlice.actions;
export default userSlice.reducer;