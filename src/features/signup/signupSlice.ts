import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExtendedFirebaseInstance } from "react-redux-firebase";
import { AppDispatch, RootState } from "../../app/store";
import { UserInfo } from "@firebase/auth-types";

interface SignupState {
    loading: boolean,
    error: string,
}

type AppThunkAPI = {
    dispatch: AppDispatch,
    state: RootState,
    extra: () => ExtendedFirebaseInstance,
    rejectValue: string
}

const initialState: SignupState = {
    loading: false,
    error: null
}


export const signUp = createAsyncThunk<UserInfo, {username: string, email: string, password: string}, AppThunkAPI>(
    'signup/signUp',
    ({username, email, password}, thunkAPI) => {
        if ( !username || username.length === 0) return thunkAPI.rejectWithValue("Cannot sign up without username")
        // thunkAPI.extra returns the function getFirebase
        return thunkAPI.extra().createUser({email, password}, {username, email}).catch(error => 
            thunkAPI.rejectWithValue(undefined)
        )
    }
)

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        });
    }

})

export const selectSigningUp = (state: RootState) => state.signup.loading;
export const selectLocalAuthError = (state: RootState) => state.signup.error;

export default signupSlice.reducer;