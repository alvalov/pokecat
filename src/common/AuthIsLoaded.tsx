import React from "react";
import { isLoaded } from "react-redux-firebase";
import { useAppSelector } from "./hooks";
import Spinner from "./Spinner";

export default function AuthIsLoaded({ children }) {
    const auth = useAppSelector(state => state.firebase.auth)
    const h = window.innerHeight;
    if (!isLoaded(auth)) return (
        <div className="d-flex justify-content-center" style={{height:h, alignItems:"center"}}>
            <Spinner />
        </div>
    )
    return children
}