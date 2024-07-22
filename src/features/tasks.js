import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


const API_URL = "http://127.0.0.1";

const initialState = {
    tasks : [],
    loading: false,
    error: null,
    message:null,
};

export const getTasks = createAsyncThunk("task/getTasks", async (_, thunkAPI) => {
    try {
        const accessToken = Cookies.get("accessToken"); 
        const response = await axios.get(`${API_URL}/api/tasks/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            return thunkAPI.rejectWithValue(response.data);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})


export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id, thunkAPI) => {
        try {
        const accessToken = Cookies.get("accessToken"); 
        const response = await axios.delete(`${API_URL}/api/tasks/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 204) {
            return response.data;
        } else {
            return thunkAPI.rejectWithValue(response.data);
        }
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);




export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, taskData }, thunkAPI) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.patch(
        `${API_URL}/api/tasks/${id}/`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 204) {
        
        return response.data; 
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


export const addTask = createAsyncThunk(
    "task/addTask",
    async (taskData, thunkAPI) => {
        try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.post(`${API_URL}/api/tasks/`, taskData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 201) {
            return response.data;
        } else {
            return thunkAPI.rejectWithValue(response.data);
        }
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTasks: (state) => {
      console.log("tasks cleared");
      state.tasks = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "task deleted";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.message = "Task added";
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
          state.message = "Task updated";
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;