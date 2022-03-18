import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { Pokecat, RootState } from "../../app/store";
import { generateBattle, Turn } from "./battleUtils";

interface BattleState {
    userCat: Pokecat,
    opponentCat: Pokecat,
    opponentUser: string,
    turns: Turn[],
    currentTurn: number,
    error: string
}

const initialState: BattleState = {
    userCat: undefined,
    opponentCat: undefined,
    opponentUser: undefined,
    turns: [],
    currentTurn: -1,
    error: undefined
}

export const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        setOpponent(state, action: PayloadAction<{username: string, cat: Pokecat}>) {
            state.opponentCat = action.payload.cat
            state.opponentUser = action.payload.username
        },
        setUserCat(state, action: PayloadAction<Pokecat>) {
            state.userCat = action.payload
        },
        startBattle(state) {
            if (!state.opponentCat  || !state.userCat) {
                state.error = "Tried to start battle with at least one cat missing"
                return
            }
            state.turns = generateBattle(state.userCat, state.opponentCat)
            state.currentTurn = 0
        },
        nextTurn(state) {
            if (state.currentTurn > -1) {
                state.currentTurn += 1
            }
        },
        resetBattleState(state) {
            return initialState
        },
    },
});

export const battleEnded = (state: RootState) => state.battle.turns.length > 0 && state.battle.currentTurn >= state.battle.turns.length;
export const battleStarted = (state: RootState) => state.battle.turns.length > 0 && state.battle.currentTurn > -1;

export const selectCurrentTurn = (state: RootState) => {
    if ( !battleStarted(state) ) return undefined
    if ( battleEnded(state) ) return _.last(state.battle.turns)
    return state.battle.turns[state.battle.currentTurn]
}

export const selectBattleUserCat = (state: RootState) => state.battle.userCat
export const selectBattleOpponentCat = (state: RootState) => state.battle.opponentCat
export const selectBattleOpponentUser = (state: RootState) => state.battle.opponentUser

export const { setOpponent, setUserCat, startBattle, nextTurn, resetBattleState } = battleSlice.actions
export default battleSlice.reducer