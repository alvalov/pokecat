import _ from "lodash";
import React, { useEffect } from "react"
import { isEmpty, isLoaded, useFirebase, useFirebaseConnect } from "react-redux-firebase";
import { selectOthersCats, selectProfileIsLoaded, selectUserCatsList } from "../../common/firebaseSelectors";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
    battleEnded as selectBattleEnded,
    battleStarted as selectBattleStarted,
    nextTurn,
    resetBattleState,
    selectBattleOpponentCat,
    selectBattleOpponentUser,
    selectBattleUserCat,
    selectCurrentTurn,
    setOpponent,
    setUserCat,
    startBattle } from "./battleSlice";
import { BattleView } from "./BattleView"

export const BattlePresenter = () => {
    useFirebaseConnect('users')
    const firebase = useFirebase();
    const dispatch = useAppDispatch();
    const profileIsLoaded = useAppSelector(selectProfileIsLoaded);
    const cats = useAppSelector(selectUserCatsList);
    const username = useAppSelector(state => state.firebase.profile.username);
    const wonBattles = useAppSelector(state => state.firebase.profile.wonBattles);
    const battles = useAppSelector(state => state.firebase.profile.battles);
    const opponentCats = useAppSelector(selectOthersCats);
    const currentTurn = useAppSelector(selectCurrentTurn);
    const battleEnded = useAppSelector(selectBattleEnded);
    const battleStarted = useAppSelector(selectBattleStarted);
    const opponentCat = useAppSelector(selectBattleOpponentCat);
    const opponentUser =  useAppSelector(selectBattleOpponentUser);
    const userCat = useAppSelector(selectBattleUserCat);

    useEffect(() => {
        if (isLoaded(opponentCats) && !isEmpty(opponentCats) && !opponentCat && !opponentUser) {
            const opponent = opponentCats[_.random(opponentCats.length-1)]
            dispatch(setOpponent({username: opponent.owner, cat: opponent.cat}))
        }
    }, [opponentCats])

    useEffect(() => {
        if (isLoaded(cats) && !isEmpty(cats) && !userCat) {
            dispatch(setUserCat(cats[_.random(cats.length-1)]))
        }
    }, [cats])

    const onBattleEnd = (userWon: boolean) => {
        // TODO: what if profileIsLoaded is false...
        const newProfileState = {
            battles: !battles ? 1 : battles+1,
            ...(userWon && { wonBattles: !wonBattles ? 1 : wonBattles+1 }) 
        };
        firebase.updateProfile(newProfileState);
        dispatch(resetBattleState());
        const opponent = opponentCats[_.random(opponentCats.length-1)]
        dispatch(setOpponent({username: opponent.owner, cat: opponent.cat}))
        dispatch(setUserCat(cats[_.random(cats.length-1)]))
    }

    const onBattleStart = () => {
        dispatch(startBattle())
    }

    const onTurnEnd = () => {
        dispatch(nextTurn())
    }

    return (
        <BattleView 
            user={username}
            userCat={userCat}
            startBattle={onBattleStart}
            onTurnEnd={onTurnEnd}
            onBattleEnd={onBattleEnd}
            loading={!profileIsLoaded || !isLoaded(opponentCats)}
            opponentUser={opponentUser}
            opponentCat={opponentCat}
            currentTurn={currentTurn}
            battleEnded={battleEnded}
            battleStarted={battleStarted}
        />
    )
}