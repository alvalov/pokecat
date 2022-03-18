import { createSelector } from "reselect";
import { RootState, UserProfile } from "../app/store";
import _ from "lodash";
import { FirebaseError } from "@firebase/util";
import { isLoaded } from "react-redux-firebase";
import { UserStats } from "./commonTypes";

export const selectProfileIsLoaded = (state: RootState) => state.firebase.profile.isLoaded;
export const selectProfileIsEmpty = (state: RootState) => state.firebase.profile.isEmpty;
export const selectUserCats = (state: RootState) => state.firebase.profile?.cats;

/**
 * Selector that extracts all cats of the user as a list. Will return
 * undefined if the profile is not loaded, but will otherwise return
 * a list. If `firebase.profile` or `firebase.profile.cats` is empty
 * (after the profile is loaded) and empty list will be returned.
 */
export const selectUserCatsList = createSelector(
    selectProfileIsLoaded,
    selectUserCats,
    (profileIsLoaded, cats) => {
        if (!profileIsLoaded) return undefined
        return _.isUndefined(cats) ? [] : _.values(cats)
    }
);

export const selectUserId = (state: RootState) => state.firebase.auth.uid;
export const selectAllUsers = (state: RootState) => state.firebase.data.users;

/**
 * Selector that extracts all users, that is not the current user.
 * The extracted data has the type {[key:string]: UserProfile}.
 * Evaluates to undefined if the firebase.data.users or firebase.auth.uid is not loaded
 */
export const selectOtherUsers = createSelector(
    selectAllUsers,
    selectUserId,
    (users, currentUser) : Record<string, UserProfile> => isLoaded(users) && isLoaded(currentUser) ? _.omit(users, currentUser) : undefined
);

/**
 * Selector that extract a list of cats that are not the current user's.
 * The extracted data is a list with elements of type {owner: string, cat: Pokecat},
 * where `owner` is the name of the user that owns the cat.
 * Evaluates to undefined if the firebase.data.users or firebase.auth.uid is not loaded.
 */
export const selectOthersCats = createSelector(
    selectOtherUsers,
    users => !isLoaded(users) ? undefined : _.flatMap(
        users,
        (user) => _.map(user.cats, cat => { return { owner: user.username, cat } })
    )
);

/**
 * Selector that extracts battles and wonBattles from each user.
 */
 export const selectAllUserStats = createSelector(
    selectAllUsers,
    (users) : UserStats[] => !isLoaded(users) ? undefined : _.map(
        users,
        user => _(user)
            .pick(['username', 'battles', 'wonBattles'])
            .defaults({battles: 0, wonBattles: 0})
            .value()
    )
);


export const selectAuthError = (state: RootState) => state.firebase.authError;
export const selectAuthErrorMessage = createSelector(
    selectAuthError,
    (error: Error) => error instanceof FirebaseError ? errorCodeToMessage[error.code] as string : error?.message
)

/**
 * An object that maps firebase auth error codes to user friendly
 * error messages. If using an unknown error code, a default
 * message will be returned.
 */
const errorCodeToMessage = new Proxy(
    {
        'auth/invalid-email': 'Invalid email format',
        'auth/weak-password': 'Password must be at least 6 characters',
        'auth/wrong-password': 'Incorrect password or email',
        'auth/user-not-found': 'Incorrect password or email',
        'auth/email-already-in-use': 'Email is already in use',
        'auth/too-many-requests': 'Too many attempts, wait a while'
    },
    {
        get: (target, key) => {
            return key in target ? target[key] : "Woops! Error during login or sign up"
        }
    }
)
