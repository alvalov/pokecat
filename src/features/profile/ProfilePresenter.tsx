import React from 'react';
import { selectProfileIsLoaded, selectUserCatsList } from '../../common/firebaseSelectors';
import { useAppSelector } from '../../common/hooks';
import { ProfileView } from './ProfileView';

export const ProfilePresenter = () => {
    const profileIsLoaded = useAppSelector(selectProfileIsLoaded);
    const username = useAppSelector(state => state.firebase.profile.username);
    const cats = useAppSelector(selectUserCatsList);
    const wonBattles = useAppSelector(state => state.firebase.profile.wonBattles);
    const battles = useAppSelector(state => state.firebase.profile.battles)

    return (
    <ProfileView 
        loading={!profileIsLoaded}
        username={username} 
        pokecats={cats}
        battles={battles?? 0}
        wonBattles={wonBattles?? 0} />
    )
}