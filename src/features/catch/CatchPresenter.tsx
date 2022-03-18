import moment from 'moment';
import React from 'react';
import { useFirebase, isEmpty } from 'react-redux-firebase';
import { Pokecat } from '../../app/store';
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { 
    fetchRandomImages, 
    selectImages, 
    selectImagesLoading, 
    selectImagesError 
} from "./catchSlice";
import { CatchView } from './CatchView';

export const CatchPresenter = () => {
    const dispatch = useAppDispatch();
    const firebase = useFirebase();
    const images = useAppSelector(selectImages);
    const imagesLoading = useAppSelector(selectImagesLoading);
    const imagesError = useAppSelector(selectImagesError);
    const userId = useAppSelector(state => state.firebase.auth.uid);
    const lastCaughtDate = useAppSelector(state => state.firebase.profile.lastCaughtDate);

    React.useEffect(() => {
        dispatch(fetchRandomImages());
    }, []);

    const pushCat = (cat: Pokecat) => {
        firebase.push(`users/${userId}/cats`, cat);
        firebase.updateProfile({ lastCaughtDate: moment().format('YYYY-MM-DD') });
    }

    return (
    <CatchView 
        images={images} 
        imagesLoading={imagesLoading} 
        imagesError={imagesError}
        canCatch={isEmpty(lastCaughtDate) || !moment(lastCaughtDate).isSame(moment(), 'day')} 
        pushCat={pushCat} />
    )
}
