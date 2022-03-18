import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { map as _map } from 'lodash';
import type { RootState } from '../../app/store';

interface CatApiResponse {
    url: string;
    [key: string]: any;
};

interface CatchState {
    images: string[];
    imagesLoading: boolean;
    imagesError: boolean;
};

const initialState: CatchState = {
    images: [],
    imagesLoading: false,
    imagesError: false,
};

export const fetchRandomImages = createAsyncThunk(
    'catch/fetchRandomImages',
    (_, thunkAPI) => {
        return fetch('https://api.thecatapi.com/v1/images/search?limit=3')
        .then(response => response.json() as Promise<CatApiResponse[]>)
        .then(data => _map(data, element => element.url))
    }
);

export const catchSlice = createSlice({
    name: 'catch',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRandomImages.pending, (state, action) => {
            state.imagesLoading = true;
        });
        builder.addCase(fetchRandomImages.fulfilled, (state, action) => {
            state.imagesError = false;
            state.imagesLoading = false;
            state.images = action.payload;
        });
        builder.addCase(fetchRandomImages.rejected, (state, action) => {
            console.log(action.payload);
            state.imagesError = true;
            state.imagesLoading = false;
        });
    }
});

export const selectImages = (state: RootState) => state.catch.images;
export const selectImagesLoading = (state: RootState) => state.catch.imagesLoading;
export const selectImagesError = (state: RootState) => state.catch.imagesError;

export default catchSlice.reducer;