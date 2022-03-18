import React from "react"
import { getFirebase, isEmpty, isLoaded } from "react-redux-firebase"
import { useAppSelector } from "../../common/hooks"
import { NavBar } from "./Navbar"

export const NavBarPresenter = () => {
    const auth = useAppSelector(state => state.firebase.auth)
    const firebase = getFirebase()

    return <NavBar showMenu={isLoaded(auth) && !isEmpty(auth)} logOut={firebase.logout}/>
}