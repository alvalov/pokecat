import React from "react"
import { useFirebaseConnect } from "react-redux-firebase"
import { selectAllUserStats } from "../../common/firebaseSelectors"
import { useAppSelector } from "../../common/hooks"
import { HomeView } from "./HomeView"

export const HomePresenter = () => {
    useFirebaseConnect('users')
    const highScore = useAppSelector(selectAllUserStats)

    return <HomeView highScore={highScore}/>
}