import { configureStore } from '@reduxjs/toolkit';
import { FirebaseReducer, firebaseReducer, getFirebase } from 'react-redux-firebase';
import battleReducer from '../features/battle/battleSlice';
import catchReducer from '../features/catch/catchSlice';
import loginReducer from '../features/login/loginSlice';
import signupReducer from '../features/signup/signupSlice';

interface DBSchema {
    test: any;
    users: UserProfile;
}

export type Pokecat = {
    name: string,
    url: string,
    attack: number,
    defense: number,
    speed: number,
}

export interface UserProfile {
    username: string;
    email: string;
    cats: {[key:string]: Pokecat};
    lastCaughtDate: string;
    battles: number;
    wonBattles: number;
}

type MyFirebaseReducer = (state: FirebaseReducer.Reducer<UserProfile, DBSchema>, action: any) => FirebaseReducer.Reducer<UserProfile, DBSchema>

const store = configureStore({  
    reducer: {
        catch: catchReducer,
        login: loginReducer,
        battle: battleReducer,
        signup: signupReducer,
        firebase: firebaseReducer as MyFirebaseReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: getFirebase,
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;