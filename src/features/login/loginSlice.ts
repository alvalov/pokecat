import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedFirebaseInstance } from "react-redux-firebase";
import { AppDispatch, RootState } from "../../app/store";
import { UserCredential, UserInfo } from "@firebase/auth-types";

interface LoginState {
    loading: boolean,
    error: string,
}

type AppThunkAPI = {
    dispatch: AppDispatch,
    state: RootState,
    extra: () => ExtendedFirebaseInstance,
    rejectValue: string
}

const initialState: LoginState = {
    loading: false,
    error: null
}

export const logIn = createAsyncThunk<UserCredential, {email: string, password: string}, AppThunkAPI>(
    'login/logIn',
    (credentials , thunkAPI) => {
        // thunkAPI.extra returns the function getFirebase
        return thunkAPI.extra().login(credentials).catch(error => 
            thunkAPI.rejectWithValue(undefined)
        )
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(logIn.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        });
    }

})

export const selectLoggingIn = (state: RootState) => state.login.loading;
export const selectLocalAuthError = (state: RootState) => state.login.error;

export default loginSlice.reducer;