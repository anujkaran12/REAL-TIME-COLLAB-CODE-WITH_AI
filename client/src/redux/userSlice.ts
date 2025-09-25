import {
  createAsyncThunk,
  createSlice,} from "@reduxjs/toolkit";
import axios from "axios";


export interface UserState {
  userData: {
    _id:string,
    name: string;
    avatar: {
      secure_url: string;
      public_id: string;
    };
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}





export const fetchUser = createAsyncThunk<any,any, { rejectValue: string }>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(
        process.env.REACT_APP_AUTH_TOKEN as string
      );

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return res.data.user;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data.msg || "Network error");
    }
  }
);
const initialState: UserState = {
  userData: null, // empty object initially
  loading: false,
  error: null,
  
};

// const registerUser
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state.userData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      

      

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userData = null
        state.loading = false;
        state.error = action.payload || "Network Error";
      });
  },
});
export const {setUser} = userSlice.actions
export default userSlice.reducer;
