import React from "react";
import { isEmpty, isLoaded } from "react-redux-firebase";
import {
    Route,
    Redirect
  } from "react-router-dom";
import { useAppSelector } from "./hooks";

type ConditionalRouteProps = {
  renderCondition: boolean,
  redirectPath: string
}

/**
 * A route component that renders its children if the `renderCondition`
 * prop holds and otherwise redirects to the route specified in the
 * `redirectPath` prop.
 */
export const ConditionalRoute : React.FC<ConditionalRouteProps> = (props) => {
  const { children, renderCondition, redirectPath, ...rest } = props
  return (
    <Route
      {...rest}
      render={({ location }) => renderCondition ? children : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: location }
          }}
        />
      )}
    />
  );
}

/**
 * A route component that renders its children only if a user
 * is authenticated and otherwise redirects to '/login'.
 */
export const AuthenticatedRoute = (props) => {
  const auth = useAppSelector(state => state.firebase.auth)
  return (
    <ConditionalRoute
      renderCondition={isLoaded(auth) && !isEmpty(auth)}
      redirectPath="/login"
      {...props}
    />
  )
}

/**
 * A route component that renders its children only if a user
 * is not authenticated and otherwise redirects to '/'.
 */
export const NonAuthenticatedRoute = (props) => {
  const auth = useAppSelector(state => state.firebase.auth)
  return (
    <ConditionalRoute
      renderCondition={isLoaded(auth) && isEmpty(auth)}
      redirectPath="/"
      {...props}
    />
  )
}
