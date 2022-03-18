import React from "react"
import { useAppDispatch, useAppSelector } from "../../common/hooks"
import { LoginView } from "./LoginView"
import { logIn, selectLocalAuthError, selectLoggingIn } from "./loginSlice"
import { selectAuthErrorMessage } from "../../common/firebaseSelectors"

export const LoginPresenter = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectLoggingIn)
    const error = useAppSelector(selectAuthErrorMessage)
    const localError = useAppSelector(selectLocalAuthError)

    const onLogIn = (email: string, password: string) => {
        dispatch(logIn({email, password}))
    }

    return (
        <LoginView
            onLogIn={onLogIn}
            loading={loading}
            error={localError ?? error} />
    )
}