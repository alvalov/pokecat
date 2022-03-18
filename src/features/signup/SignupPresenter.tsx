import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../common/hooks"
import { SignupView } from "./SignupView"
import { selectLocalAuthError, selectSigningUp, signUp } from "./signupSlice"
import { selectAuthErrorMessage } from "../../common/firebaseSelectors"

export const SignupPresenter = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectSigningUp)
    const error = useAppSelector(selectAuthErrorMessage)
    const localError = useAppSelector(selectLocalAuthError)

    const onSignUp = (username: string, email: string, password: string) => {
        dispatch(signUp({username,email, password}))
    }

    return (
        <SignupView
            onSignUp={onSignUp}
            loading={loading}
            error={localError ?? error} />
    )
}